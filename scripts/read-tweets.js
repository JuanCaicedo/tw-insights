const R = require('ramda')
const { loadAllTweets } = require('../src/load')

const main = async () => {
  const rawTweets = await loadAllTweets()
  R.map(tweet => console.log(JSON.stringify(tweet)), rawTweets)
}

main()
