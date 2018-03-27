import * as R from 'ramda'
import * as path from 'path'
import { Command, flags } from '@oclif/command'
import { loadAllTweets } from '../load'
import { isAbsolutePath } from '../utils'

export default class ReadTweets extends Command {
  static description = 'Load and read tweet archive'

  static examples = [`$ tw-insights read-tweets ./tw-data`]

  static args = [
    {
      name: 'path-to-archive',
      required: true,
      description: 'Relative path to twitter archive',
    },
  ]

  async run() {
    const { args } = this.parse(ReadTweets)
    const pathToArchive = args['path-to-archive']

    const tweetPath = isAbsolutePath(pathToArchive)
      ? path.join(pathToArchive, '/data/js/tweets/*.js')
      : path.join(process.cwd(), pathToArchive, '/data/js/tweets/*.js')
    const rawTweets = await loadAllTweets(tweetPath)
    R.map(tweet => this.log(JSON.stringify(tweet)), rawTweets)
  }
}
