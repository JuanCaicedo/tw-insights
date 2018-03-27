global.Grailbird = { data: {} }
const Bluebird = require('bluebird')
const R = require('ramda')
const glob = require('glob')
const globP = Bluebird.promisify(glob)

const requireAll = R.map(require)
const getTweets = R.pipe(R.values, R.flatten)

const loadAllTweets = async path => {
  const files = await globP(path)
  requireAll(files)
  return getTweets(Grailbird.data)
}

module.exports = {
  loadAllTweets,
}
