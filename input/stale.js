const ghutils = require('ghutils')
const assert = require('assert')

const name = 'stale'

module.exports = stale

// check if there are stale repositories
// offset defaults to 6 months
// (str, obj) -> fn -> null
function stale (org, auth, opts) {
  opts = opts || {}

  const ghOpts = ghutils.makeOptions(auth)
  const offset = 2629746000 * (opts.offset || 6)
  const threshold = Date.now() - offset

  assert.equal(typeof org, 'string', 'org must be a string')
  assert.equal(typeof auth, 'object', 'auth must be an object')
  assert.equal(typeof auth.user, 'string', 'auth.user must be a string')
  assert.equal(typeof auth.token, 'string', 'auth.token must be a string')

  return function (cb) {
    var uri = 'https://api.github.com/orgs/'
    uri += org
    uri += '/repos?type=sources'

    ghutils.lister(auth, uri, ghOpts, function (err, res) {
      if (err) return cb(err)
      cb(null, format(res))
    })
  }

  function format (data) {
    const fails = data.reduce(function (arr, chunk) {
      const lastUpdate = new Date(chunk.pushed_at).getTime()
      if (lastUpdate < threshold) {
        arr.push({ name: name, type: 'fail', data: chunk.html_url })
      }
      return arr
    }, [])

    const summary = {
      name: name,
      type: 'summary',
      data: {
        total: fails.length,
        fail: fails.length
      }
    }

    return fails.concat(summary)
  }
}
