const R = require('ramda')

const { loadAllTweets } = require('./src/load')

const main = async () => {
  try {
    const tweets = await loadAllTweets()
    const count = R.length(tweets)
    console.log('count', count)
  } catch (err) {
    console.error('Error thrown from main function', err)
  }
}

main()
