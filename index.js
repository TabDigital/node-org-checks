module.exports = exports.device = require('./device')

exports.input = {
  credentials: require('./input/credentials')
}

exports.output = {
  hipchat: require('./output/hipchat'),
  stdout: require('./output/stdout')
}
