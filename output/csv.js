const stdout = require('stdout-stream')
const csv = require('csv-write-stream')
const pump = require('pump')
const fs = require('fs')

module.exports = toCsv

// print to a csv stream
// obj -> null
function toCsv (opts) {
  opts = opts || {}
  opts.fail = opts.fail === undefined ? true : opts.fail

  return function (data, cb) {
    const rs = createCsvStream(data)
    const ws = opts.output
      ? fs.createWriteStream(opts.output)
      : stdout

    pump(rs, ws, cb)
  }
}

// create a csv stream from data
// [obj] -> rstream
function createCsvStream (data) {
  const rs = csv({ headers: [ 'name', 'type', 'data' ] })
  data.forEach(function (chunk) {
    if (chunk.type === 'summary') {
      rs.write({
        name: chunk.name,
        type: chunk.type,
        data: 'failures: ' + data.fail + 'total: ' + data.total
      })
    } else {
      rs.write(chunk)
    }
  })
  rs.end()
  return rs
}
