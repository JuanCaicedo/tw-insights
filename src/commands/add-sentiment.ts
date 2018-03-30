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
import { logErr } from '../logging'
import { getSentiments } from '../ms'
import * as LANGS from '../langs'

const addSentiment = tweets => sentimentsForTweets => {
  return mapIndexed((tweet, idx) => {
    const sentiment = R.nth(idx, sentimentsForTweets)
    return R.merge(tweet, { sentiment })
  }, tweets)
}

export default class AddSentiment extends Command {
  static description = `Analyze tweets to determine the sentiment. Receives tweets as JSON from stdin. `

  static examples = [
    `$ echo '{ "text": "hello world", "language": "English" }' | tw-insights add-sentiment`,
  ]

  toStdOut = msg => R.pipe(JSON.stringify, this.log)(msg)

  async run() {
    readJsonInput(process.stdin, 1000, tweets => {
      const sanitized = R.map(sanitize, tweets)
      getSentiments({ documents: sanitized })
        .then(addSentiment(tweets))
        .then(results => R.map(this.toStdOut, results))
        .catch(err => logErr(err))
    })
  }
}
