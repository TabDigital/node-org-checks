const mapLimit = require('map-limit')
const assert = require('assert')

module.exports = device

// creat a new device that maps input to output
// ([fn], [fn], fn) -> null
function device (input, output, cb) {
  assert.ok(input, 'input exists')
  assert.ok(output, 'output exists')

  input = Array.isArray(input) ? input : [ input ]
  output = Array.isArray(output) ? output : [ output ]

  mapLimit(input, Infinity, inputIterator, function (err, res) {
    if (err) return cb(err)
    mapLimit(output, Infinity, outputIterator(res), function (err, res) {
      if (err) return cb(err)
    })
  })

  function inputIterator (fn, cb) {
    fn(cb)
  }

  function outputIterator (data) {
    return function (fn, cb) {
      fn(data, cb)
    }
  }
}
