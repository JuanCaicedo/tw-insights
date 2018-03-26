global.Grailbird = { data: {} }
const Bluebird = require('bluebird')
const R = require('ramda')
const glob = require('glob')
const globP = Bluebird.promisify(glob)

const requireAll = R.map(require)

const loadAllTweets = async () => {
  const files = await globP('./tw-data/data/js/tweets/*.js')
  requireAll(files)
}

const getTweetsCount = R.pipe(R.values, R.map(R.length), R.sum)

const main = async () => {
  try {
    await loadAllTweets()
    const count = getTweetsCount(Grailbird.data)
    console.log('count', count)
  } catch (err) {
    console.error('Error thrown from main function', err)
  }
}

main()
