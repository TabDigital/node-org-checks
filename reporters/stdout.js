module.exports = toStdout

function toStdout () {
  return function (data, cb) {
    console.log(JSON.stringify(data, null, 2))
    cb()
  }
}
