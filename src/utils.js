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

module.exports = {
  mapIndexed,
  toStdOut,
  renameKeys,
}
