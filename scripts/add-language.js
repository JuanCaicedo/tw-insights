const R = require('ramda')
const oboe = require('oboe')
const Bluebird = require('bluebird')

const toStdOut = R.pipe(JSON.stringify, console.log)

const readStream = (input, max, cb) => {
  let buffer = []
  oboe(input)
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

  input.on('end', () => cb(buffer))
}

const main = async () => {
  readStream(process.stdin, 100, docs => R.map(toStdOut, docs))
}

main()
