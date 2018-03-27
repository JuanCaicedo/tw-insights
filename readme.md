dt-tweets
=========

analyze a tweet archive

[![Version](https://img.shields.io/npm/v/dt-tweets.svg)](https://npmjs.org/package/dt-tweets)
[![CircleCI](https://circleci.com/gh/JuanCaicedo/dt-tweets/tree/master.svg?style=shield)](https://circleci.com/gh/JuanCaicedo/dt-tweets/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/JuanCaicedo/dt-tweets?branch=master&svg=true)](https://ci.appveyor.com/project/JuanCaicedo/dt-tweets/branch/master)
[![Codecov](https://codecov.io/gh/JuanCaicedo/dt-tweets/branch/master/graph/badge.svg)](https://codecov.io/gh/JuanCaicedo/dt-tweets)
[![Downloads/week](https://img.shields.io/npm/dw/dt-tweets.svg)](https://npmjs.org/package/dt-tweets)
[![License](https://img.shields.io/npm/l/dt-tweets.svg)](https://github.com/JuanCaicedo/dt-tweets/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dt-tweets
$ tw-insights COMMAND
running command...
$ tw-insights (-v|--version|version)
dt-tweets/1.0.0 darwin-x64 node-v8.9.4
$ tw-insights --help [COMMAND]
USAGE
  $ tw-insights COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [tw-insights hello [FILE]](#tw-insights-hello-file)
* [tw-insights help [COMMAND]](#tw-insights-help-command)

## tw-insights hello [FILE]

describe the command here

```
USAGE
  $ tw-insights hello [FILE]

OPTIONS
  -f, --force
  -n, --name=name  name to print

EXAMPLE
  $ tw-insights hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/JuanCaicedo/tw-insights/blob/v1.0.0/src/commands/hello.ts)_

## tw-insights help [COMMAND]

display help for tw-insights

```
USAGE
  $ tw-insights help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v1.2.1/src/commands/help.ts)_
<!-- commandsstop -->

## data

You need to get a data dump of all your tweets and place it in `./tw-data`. You
can do that at https://twitter.com/settings/account
