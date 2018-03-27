const R = require('ramda')
const oboe = require('oboe')
const Bluebird = require('bluebird')
const replay = require('replay')

const { getLanguages } = require('../src/ms')
const { logErr } = require('../src/logging')
const mapIndexed = R.addIndex(R.map)

const toStdOut = R.pipe(JSON.stringify, console.log)

const readStream = (input, max, cb) => {
  let buffer = []
  oboe(input)
    .node('{text}', tweet => {
      buffer.push(tweet)
      if (buffer.length >= max) {
        cb(buffer)
        buffer = []
      }
    })
    .fail(err => {
      console.error('err', err)
    })

  input.on('end', () => cb(buffer))
}

const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
)
const renameId = renameKeys({ id_str: 'id' })
const sanitize = R.pipe(R.pick(['id_str', 'text']), renameId)

const addLanguage = tweets => languagesForTweets => {
  return mapIndexed((tweet, idx) => {
    const languages = R.nth(idx, languagesForTweets)
    return R.merge(tweet, { languages })
  }, tweets)
}

const main = async () => {
  readStream(process.stdin, 100, tweets => {
    const sanitized = R.map(sanitize, tweets)
    getLanguages({ documents: sanitized })
      .then(addLanguage(tweets))
      .then(results => R.map(toStdOut, results))
      .catch(err => logErr(err))
  })
}

main()
