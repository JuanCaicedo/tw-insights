const R = require('ramda')
const replay = require('replay')

const LANGS = require('../src/langs')
const { logErr } = require('../src/logging')
const { getSentiments } = require('../src/ms')
const { readJsonInput } = require('../src/read-json-input')
const {
  mapIndexed,
  toStdOut,
  renameKeys,
  pickTopScore,
} = require('../src/utils')

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

const main = async () => {
  readJsonInput(process.stdin, 100, tweets => {
    const sanitized = R.map(sanitize, tweets)
    getSentiments({ documents: sanitized })
      .then(addSentiment(tweets))
      .then(results => R.map(toStdOut, results))
      .catch(err => logErr(err))
  })
}

main()
