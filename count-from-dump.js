global.Grailbird = { data: {} }
const Bluebird = require('bluebird')
const glob = require('glob')
const globP = Bluebird.promisify(glob)

const loadAllTweets = async () => {
  const files = await globP('./tw-data/data/js/tweets/*.js')
  files.map(file => require(file))
}

const main = async () => {
  try {
    await loadAllTweets()
    console.log('Grailbird.data', Grailbird.data)
  } catch (err) {
    console.error('Error thrown from main function', err)
  }
}

main()
