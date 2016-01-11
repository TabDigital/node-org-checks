const mapLimit = require('map-limit')
const assert = require('assert')

module.exports = device

// creat a new device that maps input to output
// ([fn], [fn], fn) -> null
function device (inputs, outputs, cb) {
  assert.ok(inputs, 'inputs exists')
  assert.ok(outputs, 'outputs exists')

  inputs = Array.isArray(inputs) ? inputs : [ inputs ]
  outputs = Array.isArray(outputs) ? outputs : [ outputs ]

  mapLimit(inputs, Infinity, inputIterator, function (err, res) {
    if (err) return cb(err)
    mapLimit(outputs, Infinity, outputIterator(res), function (err, res) {
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
