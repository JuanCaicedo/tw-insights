const Bluebird = require('bluebird')
const R = require('ramda')
const path = require('path')
const glob = require('glob')
const globP = Bluebird.promisify(glob)

const requireAll = R.map(require)

const loadAllTweets = async () => {
  const files = await globP(
    path.join(__dirname, '../tw-data/data/js/tweets/*.js')
  )
  requireAll(files)
}

module.exports = {
  loadAllTweets,
}
