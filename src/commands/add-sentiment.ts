import { Command, flags } from '@oclif/command'
import * as R from 'ramda'
import { readJsonInput } from '../read-json-input'
import { sanitize, addSentiment } from '../utils'
import { logErr } from '../logging'
import { getSentiments } from '../ms'
import * as LANGS from '../langs'

export default class AddSentiment extends Command {
  static description = `Analyze tweets to determine the sentiment. Receives tweets as JSON from stdin. `

  static examples = [
    `$ echo '{ "text": "hello world", "language": "English", "id_str": 1 }' | tw-insights add-sentiment`,
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
