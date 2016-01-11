const HipchatClient = require('hipchat-client')
const assert = require('assert')

const name = 'github-inputs'

module.exports = toHipchat

// format stuff to hipchat
// opts: { str:room, str:token }
// obj -> (obj, (err, res)) -> null
function toHipchat (opts) {
  assert.equal(typeof opts, 'object', 'opts should be an object')
  assert.equal(typeof opts.token, 'string', 'opts.token should be an string')
  assert.equal(typeof opts.room, 'string', 'opts.room should be an string')

  const hipchat = new HipchatClient(opts.token)

  return function toHipchat (data, cb) {
    const msg = {
      room_id: opts.room,
      from: name,
      message: format(data)
    }

    hipchat.api.rooms.message(msg, function (err, res) {
      if (err) return cb(err)
    })
  }
}

// format data for hipchat html
// obj -> str
function format (data) {
  return 'hello world'
}
