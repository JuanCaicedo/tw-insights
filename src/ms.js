const axios = require('axios')
const R = require('ramda')
const replay = require('replay')

const { MS_ACCESS_KEY } = require('../secrets')

const host = 'westus.api.cognitive.microsoft.com'
const path = '/text/analytics/v2.0'
const url = `https://${host}${path}`

const pickDocuments = R.pipe(R.prop('data'), R.prop('documents'))
const pickLanguages = R.pipe(pickDocuments, R.map(R.prop('detectedLanguages')))
const pickSentiments = R.pipe(pickDocuments, R.map(R.prop('score')))

const getLanguages = data => {
  return axios
    .post(`${url}/languages`, data, {
      headers: { 'Ocp-Apim-Subscription-Key': MS_ACCESS_KEY },
    })
    .then(pickLanguages)
}

const getSentiments = data => {
  return axios
    .post(`${url}/sentiment`, data, {
      headers: { 'Ocp-Apim-Subscription-Key': MS_ACCESS_KEY },
    })
    .then(pickSentiments)
}

module.exports = {
  getLanguages,
  getSentiments,
}
