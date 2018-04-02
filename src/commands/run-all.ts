import { Command } from '@oclif/command'
import * as R from 'ramda'
import * as path from 'path'
import * as Bluebird from 'bluebird'
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
    const sanitized = R.map(sanitize, rawTweets)
    const batches = intoBatches(sanitized)
    const languageBatches = await Bluebird.map(batches, batch =>
      getLanguages({ documents: batch })
    )
    const withLanguage = addLanguage(rawTweets)(R.unnest(languageBatches))
    const langBatches = intoBatches(R.map(sanitize, withLanguage))
    const sentimentBatches = await Bluebird.map(langBatches, batch =>
      getSentiments({ documents: batch })
    )
    const withSentiment = addSentiment(withLanguage)(
      R.flatten(sentimentBatches)
    )
    const keyPhraseBatches = await Bluebird.map(langBatches, batch =>
      getKeyPhrases({ documents: batch })
    )
    const withKeyPhrase = addKeyPhrases(withSentiment)(
      R.unnest(keyPhraseBatches)
    )

    const result = withKeyPhrase

    R.map(this.toStdOut, result)
  }
}
