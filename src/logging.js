const logErr = err => {
  if (err.response) {
    console.error('err.response.data', err.response.data)
  } else if (err.message) {
    console.error('err.message', err.message)
    console.error('err.stack', err.stack)
  } else if (err.request) {
    console.error('err.request', err.request)
  } else {
    console.error('err', err)
  }
}

module.exports = {
  logErr,
}
