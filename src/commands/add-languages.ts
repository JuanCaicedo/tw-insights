import { Command, flags } from '@oclif/command'
import * as R from 'ramda'
import { readJsonInput } from '../read-json-input'
import { getLanguages } from '../ms'
import { logErr } from '../logging'
import { mapIndexed, renameKeys, pickTopScore } from '../utils'

const renameId = renameKeys({ id_str: 'id' })
const sanitize = R.pipe(R.pick(['id_str', 'text']), renameId)
const maxScore = R.maxBy(R.prop('score'))
const pickTopLanguage = R.reduce(maxScore, { score: 0 })

const addLanguage = tweets => languagesForTweets => {
  return mapIndexed((tweet, idx) => {
    const languages = R.nth(idx, languagesForTweets)
    const language = pickTopLanguage(languages)
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
    process.stdout.on('error', () => {})
    readJsonInput(process.stdin, 100, tweets => {
      const sanitized = R.map(sanitize, tweets)
      getLanguages({ documents: sanitized })
        .then(addLanguage(tweets))
        .then(results => R.map(this.toStdOut, results))
        .catch(err => logErr(err))
    })
  }
}
