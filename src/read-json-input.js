const oboe = require('oboe')

const readJsonInput = (inputStream, max, cb) => {
  let buffer = []
  oboe(inputStream)
    .node('{text}', tweet => {
      buffer.push(tweet)
      if (buffer.length >= max) {
        cb(buffer)
        buffer = []
      }
    })
    .fail(err => {
      console.error('err', err)
    })

  inputStream.on('end', () => cb(buffer))
}

module.exports = { readJsonInput }
