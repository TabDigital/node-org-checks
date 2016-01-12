const HipchatClient = require('hipchat-client')
const toHtml = require('vdom-to-html')
const h = require('virtual-dom/h')
const assert = require('assert')

const name = 'github-checks'

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
      message: formatData(data),
      card: createCard(data)
    }

    hipchat.api.rooms.message(msg, function (err, res) {
      if (err) return cb(err)
    })
  }
}

// format data to create a hipchat card
// obj -> str
function formatData (data) {
  const innerTable = [
    h('tr', [
      h('td', h('b', 'name')),
      h('td', h('b', 'value'))
    ])
  ].concat(formatData(data))

  return toHtml(h('table', innerTable))

  function formatData (data) {
    return data.reduce(function (arr, obj) {
      if (obj.type !== 'summary') return arr
      const el = h('tr', [
        h('td', obj.name),
        h('td', obj.data.fail + ' issues')
      ])
      arr.push(el)
      return arr
    }, [])
  }
}

// create card metadata
// https://developer.atlassian.com/hipchat/guide/hipchat-ui-extensions/cards
// https://www.hipchat.com/docs/apiv2/method/send_room_notification
// obj -> str
function createCard (data) {
  return { stye: 'application', title: name }
}
