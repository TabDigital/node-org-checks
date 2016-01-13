const fromString = require('from2-string')
const stdout = require('stdout-stream')
const toHtml = require('vdom-to-html')
const h = require('virtual-dom/h')
const pump = require('pump')
const fs = require('fs')

module.exports = toXml

// print to stdout
// opts.output: writestream to write to, defaults to stdout
// obj -> null
function toXml (opts) {
  opts = opts || {}

  return function (data, cb) {
    const ws = opts.output
      ? fs.createWriteStream(opts.output)
      : stdout

    const rs = fromString(createXml(data))
    pump(rs, ws, cb)
  }
}

// convert data to xml format
// reference https://github.com/aghassemi/tap-xunit/tree/master/test/expected
// obj -> str
function createXml (data) {
  const prefix = '<?xml version="1.0"?>'
  const nwdata = sort(data)
  const tree = h('testsuites', format(nwdata))
  return prefix + toHtml(tree)

  // group by error type
  function sort (data) {
    return data.reduce(function (obj, chunk) {
      if (chunk.type === 'summary') {
        if (!obj[chunk.name]) obj[chunk.name] = { errors: [] }
        obj[chunk.name].summary = chunk.name

        return obj
      }

      if (chunk.type === 'fail') {
        if (!obj[chunk.name]) obj[chunk.name] = { errors: [] }
        obj[chunk.name].errors.push(chunk.data)

        return obj
      }
    }, {})
  }

  // to vdom/xml
  function format (data) {
    var i = 0
    return Object.keys(data).map(function (key) {
      const chunk = data[key]
      const meta = {
        name: chunk.summary,
        attributes: {
          tests: chunk.errors.length,
          failures: chunk.errors.length
        }
      }
      return h('testsuite', meta, chunk.errors.map(function (err) {
        i += 1
        const meta = { name: '#' + i + ' ' + err }
        return h('testcase', meta, [
          h('failure', [
            '---',
            '  operator: ok',
            '  expected: true',
            '  actual: false',
            '...'
          ].join('\n'))
        ])
      }))
    })
  }
}
