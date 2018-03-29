const R = require('ramda')
const { loadAllTweets } = require('../src/load')
const path = require('path')

const main = async () => {
  const rawTweets = await loadAllTweets(
    path.join(__dirname, '../tw-data/data/js/tweets/*.js')
  )
  R.map(tweet => console.log(JSON.stringify(tweet)), rawTweets)
}

main()
