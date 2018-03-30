import { Command, flags } from '@oclif/command'
import * as R from 'ramda'
import { readJsonInput } from '../read-json-input'
import { mapIndexed, renameKeys, pickTopScore } from '../utils'
import { logErr } from '../logging'
import { getSentiments } from '../ms'
import * as LANGS from '../langs'

const addSentiment = tweets => sentimentsForTweets => {
  return mapIndexed((tweet, idx) => {
    const sentiment = R.nth(idx, sentimentsForTweets)
    return R.merge(tweet, { sentiment })
  }, tweets)
}

const renameId = renameKeys({ id_str: 'id' })
const mapLang = obj => R.merge(obj, { language: LANGS[obj.language] })
const sanitize = R.pipe(
  R.pick(['id_str', 'text', 'language']),
  renameId,
  mapLang
)

export default class AddSentiment extends Command {
  static description = `Analyze tweets to determine the sentiment. Receives tweets as JSON from stdin. `

  static examples = [
    `$ echo '{ "text": "hello world", "language": "English" }' | tw-insights add-sentiment`,
  ]

  toStdOut = msg => R.pipe(JSON.stringify, this.log)(msg)

  async run() {
    process.stdout.on('error', () => {})
    readJsonInput(process.stdin, 100, tweets => {
      const sanitized = R.map(sanitize, tweets)
      getSentiments({ documents: sanitized })
        .then(addSentiment(tweets))
        .then(results => R.map(this.toStdOut, results))
        .catch(err => logErr(err))
    })
  }
}
