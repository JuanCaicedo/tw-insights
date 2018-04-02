const R = require('ramda')
const LANGS = require('./langs')

const mapIndexed = R.addIndex(R.map)
const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
)
const maxScore = R.maxBy(R.prop('score'))
const pickTopScore = R.reduce(maxScore, { score: 0 })
const isAbsolutePath = R.test(/^\//)

const renameId = renameKeys({ id_str: 'id' })
const mapLang = obj => R.merge(obj, { language: LANGS[obj.language] })
const sanitize = R.pipe(
  R.pick(['id_str', 'text', 'language']),
  renameId,
  mapLang
)

const addLanguage = tweets => languagesForTweets => {
  return mapIndexed((tweet, idx) => {
    const languages = R.nth(idx, languagesForTweets)
    const language = pickTopScore(languages)
    return R.merge(tweet, { language: language.name })
  }, tweets)
}

module.exports = {
  mapIndexed,
  renameKeys,
  pickTopScore,
  isAbsolutePath,
  renameId,
  sanitize,
  addLanguage,
}
