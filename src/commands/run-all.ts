import { Command } from '@oclif/command'
import * as R from 'ramda'
import * as path from 'path'
import {
  isAbsolutePath,
  sanitize,
  addLanguage,
  addSentiment,
  addKeyPhrases,
} from '../utils'
import { loadAllTweets } from '../load'
import { getLanguages, getSentiments, getKeyPhrases } from '../ms'

const MAX_MS_BODY_SIZE = 1000
const intoBatches = R.splitEvery(MAX_MS_BODY_SIZE)
const getLanguagesOne = R.pipe(R.map(sanitize), sanitized =>
  getLanguages({ documents: sanitized })
)
const getLanguagesAll = R.map(getLanguagesOne)
const getSentimentsOne = R.pipe(R.map(sanitize), sanitized =>
  getSentiments({ documents: sanitized })
)
const getSentimentsAll = R.map(getSentimentsOne)
const getKeyPhrasesOne = R.pipe(R.map(sanitize), sanitized =>
  getKeyPhrases({ documents: sanitized })
)
const getKeyPhrasesAll = R.map(getKeyPhrasesOne)

export default class RunAll extends Command {
  static description = 'Run all MS azure text analysis tasks on a tweet archive'

  static examples = [`$ tw-insights run-all ./tw-data`]

  static args = [
    {
      name: 'path-to-archive',
      required: true,
      description: 'Relative path to twitter archive',
    },
  ]

  toStdOut = msg => R.pipe(JSON.stringify, this.log)(msg)

  async run() {
    const { args } = this.parse(RunAll)
    const pathToArchive = args['path-to-archive']

    const tweetPath = isAbsolutePath(pathToArchive)
      ? path.join(pathToArchive, '/data/js/tweets/*.js')
      : path.join(process.cwd(), pathToArchive, '/data/js/tweets/*.js')
    const rawTweets = await loadAllTweets(tweetPath)
    const batches = intoBatches(rawTweets)
    const languageBatches = await Promise.all(getLanguagesAll(batches))
    const withLanguage = addLanguage(rawTweets)(R.unnest(languageBatches))
    const langBatches = intoBatches(withLanguage)
    const sentimentBatches = await Promise.all(getSentimentsAll(langBatches))
    const withSentiment = addSentiment(withLanguage)(
      R.flatten(sentimentBatches)
    )
    const keyPhraseBatches = await Promise.all(getKeyPhrasesAll(langBatches))
    const withKeyPhrase = addKeyPhrases(withSentiment)(
      R.unnest(keyPhraseBatches)
    )

    const result = withKeyPhrase

    R.map(this.toStdOut, result)
  }
}
