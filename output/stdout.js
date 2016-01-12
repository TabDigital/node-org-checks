module.exports = toStdout

// print to stdout
// obj -> null
function toStdout (opts) {
  opts = opts || {}
  return function (data, cb) {
    if (opts.summary) data = filter(data)
    console.log(JSON.stringify(data, null, 2))
    cb()
  }
}

// filter type=summary
// [obj] -> [obj]
function filter (data) {
  return data.filter(function (chunk) {
    if (chunk.type === 'summary') return chunk
  })
}
