# tw-insights

Analyze a tweet archive using Microsoft Azure's text analytics services.

## Getting data

You will need to get an archive tweets to analyze. The easiest way to do that is
to get your own archive from can do that at https://twitter.com/settings/account

## Microsoft Azure credentials

You will need to create a Microsoft Azure account, enable Cognitive Services and
then place your API key in a `.env` file like so:
```
MS_ACCESS_KEY=access-key-value
```

More instructions can be found here:
https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-signup

## How to run

There are two ways to run this tool

##### Top-level command

```bash
$ tw-insights run-all [path-to-archive]
```

This will read all the tweets in the archive and run them through all the
analysis steps. In doing so, it will split the tweets into batches of 1000 to
respect Azure's upload limit. The tool does nothing else to manage rate
limiting, so you might hit errors if you analyze a lot of data at once.

##### Individually run steps

```bash
$ tw-insights read-tweets [path-to-archive] | tw-insights add-languages | tw-insights add-sentiment | tw-insights add-key-phrases
```

The individual commands have all been built to read tweets from stdin as new
line delimited JSON. The results of one command can be pipe into another, and
the tool will automatically batch them into groups of 1000 per request to
respect Azure's upload limits. This approach may lead to better performance on
large datasets. Note that sentiment and key phrases analyses require a language
to be set, which language analysis step provides.
