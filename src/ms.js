const axios = require('axios')
const R = require('ramda')

const { MS_ACCESS_KEY } = require('../secrets')

const host = 'westus.api.cognitive.microsoft.com'
const path = '/text/analytics/v2.0/languages'
const url = `https://${host}${path}`

const getLanguages = data => {
  return axios.post(url, data, {
    headers: { 'Ocp-Apim-Subscription-Key': MS_ACCESS_KEY },
  })
}

module.exports = {
  getLanguages,
}
