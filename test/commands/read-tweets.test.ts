import { expect, test } from '@oclif/test'

describe.skip('read-tweets', () => {
  test
    .stderr()
    .stdout()
    .command(['read-tweets'])
    .catch(() => {})
    .it('requires path argument', ctx => {
      expect(ctx.stderr).to.contain('Error')
    })

  // test
  // .stdout()
  // .command(['read-tweets', '--name', 'jeff'])
  // .it('runs hello --name jeff', ctx => {
  //   expect(ctx.stdout).to.contain('hello jeff')
  // })
})
