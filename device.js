const mapLimit = require('map-limit')
const assert = require('assert')

module.exports = device

// creat a new device that maps input to output
// ([fn], [fn], fn) -> null
function device (input, output, cb) {
  assert.ok(input, 'input exists')
  assert.ok(output, 'output exists')

  cb = cb || errBack

  input = Array.isArray(input) ? input : [ input ]
  output = Array.isArray(output) ? output : [ output ]

  mapLimit(input, Infinity, inputIterator, function (err, res) {
    if (err) return cb(err)
    const arr = res.reduce(function (arr, item) {
      return arr.concat(item)
    }, [])
    mapLimit(output, Infinity, outputIterator(arr), function (err, res) {
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

function errBack (err) {
  if (err) throw err
}
