tw-insights
=========

Analyze a tweet archive using Microsoft Azure's text analytics services.

[![Version](https://img.shields.io/npm/v/tw-insights.svg)](https://npmjs.org/package/tw-insights)
[![CircleCI](https://circleci.com/gh/JuanCaicedo/tw-insights/tree/master.svg?style=shield)](https://circleci.com/gh/JuanCaicedo/tw-insights/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/JuanCaicedo/tw-insights?branch=master&svg=true)](https://ci.appveyor.com/project/JuanCaicedo/tw-insights/branch/master)
[![Codecov](https://codecov.io/gh/JuanCaicedo/tw-insights/branch/master/graph/badge.svg)](https://codecov.io/gh/JuanCaicedo/tw-insights)
[![Downloads/week](https://img.shields.io/npm/dw/tw-insights.svg)](https://npmjs.org/package/tw-insights)
[![License](https://img.shields.io/npm/l/tw-insights.svg)](https://github.com/JuanCaicedo/tw-insights/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tw-insights
$ tw-insights COMMAND
running command...
$ tw-insights (-v|--version|version)
tw-insights/1.0.0 darwin-x64 node-v8.9.4
$ tw-insights --help [COMMAND]
USAGE
  $ tw-insights COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [tw-insights read-tweets [FILE]](#tw-insights-hello-file)
* [tw-insights  [FILE]](#tw-insights-hello-file)
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
