import { Command, flags } from '@oclif/command'
import * as R from 'ramda'
import { readJsonInput } from '../read-json-input'
import { sanitize, addKeyPhrases } from '../utils'
import { logErr } from '../logging'
import { getKeyPhrases } from '../ms'

export default class AddSentiment extends Command {
  static description = `Analyze tweets to determine key phrases. Receives tweets as JSON from stdin. `

  static examples = [
    `$ echo '{ "text": "hello world", "language": "English", "id_str": 1 }' | tw-insights add-key-phrases`,
  ]

  toStdOut = msg => R.pipe(JSON.stringify, this.log)(msg)

  async run() {
    process.stdout.on('error', () => {})
    readJsonInput(process.stdin, 1000, tweets => {
      const sanitized = R.map(sanitize, tweets)
      getKeyPhrases({ documents: sanitized })
        .then(addKeyPhrases(tweets))
        .then(results => R.map(this.toStdOut, results))
        .catch(err => logErr(err))
    })
  }
}
