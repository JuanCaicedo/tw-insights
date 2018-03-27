const R = require('ramda')
const Bluebird = require('bluebird')
const replay = require('replay')

const { getLanguages } = require('../src/ms')
const { logErr } = require('../src/logging')
const { readJsonInput } = require('../src/read-json-input')

const mapIndexed = R.addIndex(R.map)

const toStdOut = R.pipe(JSON.stringify, console.log)

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
)
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

const main = async () => {
  readJsonInput(process.stdin, 100, tweets => {
    const sanitized = R.map(sanitize, tweets)
    getLanguages({ documents: sanitized })
      .then(addLanguage(tweets))
      .then(results => R.map(toStdOut, results))
      .catch(err => logErr(err))
  })
}

main()
