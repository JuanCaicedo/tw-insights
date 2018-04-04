import { Hook } from '@oclif/config'

const hook: Hook<'init'> = async function(opts) {
  process.stdout.on('error', () => {})
}

export default hook
