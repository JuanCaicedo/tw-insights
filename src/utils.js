const R = require('ramda')

const mapIndexed = R.addIndex(R.map)
const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
)
const toStdOut = R.pipe(JSON.stringify, console.log)
const maxScore = R.maxBy(R.prop('score'))
const pickTopScore = R.reduce(maxScore, { score: 0 })
const isAbsolutePath = R.test(/^\//)

module.exports = {
  mapIndexed,
  toStdOut,
  renameKeys,
  pickTopScore,
  isAbsolutePath,
}
