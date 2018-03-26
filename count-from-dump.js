global.Grailbird = { data: {} }
const R = require('ramda')

const { loadAllTweets } = require('./src/load')

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
