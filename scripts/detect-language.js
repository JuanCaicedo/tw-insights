const R = require('ramda')

const { loadAllTweets } = require('../src/load')
const { getLanguages } = require('../src/ms')

const pickLanguage = R.map(R.prop('detectedLanguages'))
const mapIndexed = R.addIndex(R.map)
const addId = (item, id) => R.merge(item, { id })
const addIdToAll = mapIndexed(addId)

const main = async () => {
  try {
    const rawTweets = await loadAllTweets()
    const tweets = addIdToAll(R.take(10, rawTweets))
    const response = await getLanguages({ documents: tweets })
    const { data: { documents: languages } } = response
    console.log('pickLanguage(languages)', pickLanguage(languages))
  } catch (err) {
    if (err.response) {
      console.error('err.response.data', err.response.data)
    } else if (err.request) {
      console.error('err.request', err.request)
    } else {
      console.error('err.message', err.message)
      console.error('err.stack', err.stack)
    }
  }
}

main()
