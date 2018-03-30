import {expect, test} from '@oclif/test'

describe('add-sentiment', () => {
  test
  .stdout()
  .command(['add-sentiment'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['add-sentiment', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
