const R = require('ramda')

const { loadAllTweets } = require('../src/load')
const { getLanguages } = require('../src/ms')
const { logErr } = require('../src/logging')

const pickLanguage = R.map(R.prop('detectedLanguages'))
const mapIndexed = R.addIndex(R.map)
const addId = (item, id) => R.merge(item, { id })
const addIdToAll = mapIndexed(addId)

const main = async () => {
  try {
    const rawTweets = await loadAllTweets()
    const tweets = addIdToAll(R.take(10, rawTweets))
    const languages = await getLanguages({ documents: tweets })
    console.log('languages', languages)
  } catch (err) {
    logErr(err)
  }
}

main()
