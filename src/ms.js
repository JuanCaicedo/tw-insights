const axios = require('axios')
const R = require('ramda')
const Bluebird = require('bluebird')
const replay = require('replay')

const { sanitize, mapIndexed } = require('./utils')
const { MS_ACCESS_KEY } = require('../secrets')

const host = 'westus.api.cognitive.microsoft.com'
const path = '/text/analytics/v2.0'
const url = `https://${host}${path}`

const pickDocuments = R.pipe(R.prop('data'), R.prop('documents'))
const pickLanguages = R.pipe(pickDocuments, R.map(R.prop('detectedLanguages')))
const pickSentiments = R.pipe(pickDocuments, R.map(R.prop('score')))
const pickKeyPhrases = R.pipe(pickDocuments, R.map(R.prop('keyPhrases')))

const prepareDocument = mapIndexed(sanitize)
const dataToDocuments = data => ({ documents: data })
const prepareData = R.pipe(prepareDocument, dataToDocuments)

const getLanguages = data => {
  return Bluebird.resolve(prepareData(data))
    .then(prepared =>
      axios.post(`${url}/languages`, prepared, {
        headers: { 'Ocp-Apim-Subscription-Key': MS_ACCESS_KEY },
      })
    )
    .then(pickLanguages)
}

const getSentiments = data => {
  return Bluebird.resolve(prepareData(data))
    .then(prepared =>
      axios.post(`${url}/sentiment`, prepared, {
        headers: { 'Ocp-Apim-Subscription-Key': MS_ACCESS_KEY },
      })
    )
    .then(pickSentiments)
}

const getKeyPhrases = data => {
  return Bluebird.resolve(prepareData(data))
    .then(prepared =>
      axios.post(`${url}/keyPhrases`, prepared, {
        headers: { 'Ocp-Apim-Subscription-Key': MS_ACCESS_KEY },
      })
    )
    .then(pickKeyPhrases)
}

module.exports = {
  getLanguages,
  getSentiments,
  getKeyPhrases,
}
