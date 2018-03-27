import {Command, flags} from '@oclif/command'

export default class AddLanguages extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ tw-insights add-languages
hello world from ./src/add-languages.ts!
`,
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(AddLanguages)

    const name = flags.name || 'world'
    this.log(`hello ${name} from ${__filename}!`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
