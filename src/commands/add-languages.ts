import {Command, flags} from '@oclif/command'

export default class AddLanguages extends Command {
  static description = 'Analyze tweets to determine its main language'

  static examples = [
    `$ echo '{ text: "hello world" }' | tw-insights add-languages`,
  ]

  async run() {
  }
}
