import { Command, flags } from '@oclif/command'
import * as R from 'ramda'
import { readJsonInput } from '../read-json-input'
import {
  mapIndexed,
  renameKeys,
  pickTopScore,
  renameId,
  sanitize,
} from '../utils'
import { getLanguages } from '../ms'
import { logErr } from '../logging'
import { mapIndexed, renameKeys, pickTopScore } from '../utils'

const addLanguage = tweets => languagesForTweets => {
  return mapIndexed((tweet, idx) => {
    const languages = R.nth(idx, languagesForTweets)
    const language = pickTopScore(languages)
    return R.merge(tweet, { language: language.name })
  }, tweets)
}

export default class AddLanguages extends Command {
  static description = `Analyze tweets to determine its main language. Receives tweets as JSON from stdin. `

  static examples = [
    `$ echo '{ "text": "hello world" }' | tw-insights add-languages`,
  ]

  toStdOut = msg => R.pipe(JSON.stringify, this.log)(msg)

  async run() {
    readJsonInput(process.stdin, 1000, tweets => {
      const sanitized = R.map(sanitize, tweets)
      getLanguages({ documents: sanitized })
        .then(addLanguage(tweets))
        .then(results => R.map(this.toStdOut, results))
        .catch(err => logErr(err))
    })
  }
}
