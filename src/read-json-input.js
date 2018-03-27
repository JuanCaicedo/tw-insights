const readline = require('readline')
const Stream = new require('stream')

const readJsonInput = (input, max, cb) => {
  const rl = readline.createInterface({
    input,
    output: Stream.Writable(),
    terminal: false,
  })

  let buffer = []

  rl.on('line', line => {
    try {
      const tweet = JSON.parse(line)

      buffer.push(tweet)
      if (buffer.length >= max) {
        cb(buffer)
        buffer = []
      }
    } catch (err) {
      console.error('err', err)
    }
  })

  rl.on('close', () => cb(buffer))
}

module.exports = { readJsonInput }
