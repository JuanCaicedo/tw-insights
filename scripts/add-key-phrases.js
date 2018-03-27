const R = require('ramda')
const replay = require('replay')

const LANGS = require('../src/langs')
const { logErr } = require('../src/logging')
const { getKeyPhrases } = require('../src/ms')
const { readJsonInput } = require('../src/read-json-input')
const {
  mapIndexed,
  toStdOut,
  renameKeys,
  pickTopScore,
} = require('../src/utils')

const addKeyPhrase = tweets => keyPhrasesForTweets => {
  return mapIndexed((tweet, idx) => {
    const keyPhrases = R.nth(idx, keyPhrasesForTweets)
    return R.merge(tweet, { keyPhrases })
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
    getKeyPhrases({ documents: sanitized })
      .then(addKeyPhrase(tweets))
      .then(results => R.map(toStdOut, results))
      .catch(err => logErr(err))
  })
}

main()
