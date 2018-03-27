const oboe = require('oboe')
const Bluebird = require('bluebird')

const readStream = input => {
  let count = 0
  return new Bluebird(resolve => {
    oboe(input)
      .node('{text}', tweet => {
        count += 1
      })
      .fail(err => {
        console.error('err', err)
      })

    input.on('end', () => resolve(count))
  })
}

const main = async () => {
  const count = await readStream(process.stdin)
  console.log('count', count)
}

main()
