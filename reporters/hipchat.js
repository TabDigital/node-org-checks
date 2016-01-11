#!/usr/bin/env node
const cliclopts = require('cliclopts')
const minimist = require('minimist')
const https = require('https')
const util = require('util')

const opts = cliclopts([
  { name: 'help', abbr: 'h', boolean: true },
  { name: 'version', abbr: 'v', boolean: true }
])

const argv = minimist(process.argv.slice(2), opts.options())

// parse options
if (!argv._.length) {
  process.stdout.write('Error: no command specified\n')
  usage(1)
} else {
  main(argv, function (err) {
    if (err) {
      process.stderr.write(util.format(err) + '\n')
      process.exit(1)
    }
  })
}

// fmt json to hipchat html and send it
// obj -> null
function main () {
  const opts = {}
  https.request(opts)
}

// print usage & exit
// num? -> null
function usage (exitCode) {
  console.log('echo <json> | hipchat -[rtn]')
  process.exit(exitCode)
}
