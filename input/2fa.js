const ghutils = require('ghutils')
const assert = require('assert')

const name = '2FA'

module.exports = twoFactor

// check if 2fa is enabled on all users
// (str, obj) -> fn -> null
function twoFactor (org, auth) {
  const ghOpts = ghutils.makeOptions(auth)

  assert.equal(typeof org, 'string', 'org must be a string')
  assert.equal(typeof auth, 'object', 'auth must be an object')
  assert.equal(typeof auth.user, 'string', 'auth.user must be a string')
  assert.equal(typeof auth.token, 'string', 'auth.token must be a string')

  return function (cb) {
    var uri = 'https://api.github.com/orgs/'
    uri += org
    uri += '/members?filter=2fa_disabled'

    ghutils.lister(auth, uri, ghOpts, function (err, res) {
      if (err) return cb(err)
      cb(null, format(res))
    })
  }

  function format (data) {
    const summary = {
      name: name,
      type: 'summary',
      data: {
        total: data.length,
        fail: data.length
      }
    }
    return data.map(function (chunk) {
      return { name: name, type: 'fail', data: chunk.html_url }
    }).concat(summary)
  }
}
