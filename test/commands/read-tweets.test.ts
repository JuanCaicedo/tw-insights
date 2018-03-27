import {expect, test} from '@oclif/test'

describe('read-tweets', () => {
  test
  .stdout()
  .command(['read-tweets'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['read-tweets', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
