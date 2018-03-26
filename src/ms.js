const axios = require('axios')
const R = require('ramda')
const replay = require('replay')

const { MS_ACCESS_KEY } = require('../secrets')

const host = 'westus.api.cognitive.microsoft.com'
const path = '/text/analytics/v2.0/languages'
const url = `https://${host}${path}`

const pickLanguages = R.pipe(
  R.prop('data'),
  R.prop('documents'),
  R.map(R.prop('detectedLanguages'))
)

const getLanguages = data => {
  return axios
    .post(url, data, {
      headers: { 'Ocp-Apim-Subscription-Key': MS_ACCESS_KEY },
    })
    .then(pickLanguages)
}

module.exports = {
  getLanguages,
}
