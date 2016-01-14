const mapLimit = require('map-limit')
const ghutils = require('ghutils')
const assert = require('assert')

module.exports = awsCredentialScraper

// Naive AWS credential scraper for git
// (str, obj) -> fn -> null
function awsCredentialScraper (org, auth, opts) {
  assert.equal(typeof org, 'string', 'org must be a string')
  assert.equal(typeof auth, 'object', 'auth must be an object')
  assert.equal(typeof auth.user, 'string', 'auth.user must be a string')
  assert.equal(typeof auth.token, 'string', 'auth.token must be a string')

  opts = opts || {}

  const ghOpts = ghutils.makeOptions(auth)
  const uris = [
    {
      name: 'aws_key',
      uri: 'https://api.github.com/search/code?q=AWS_KEY+user:' + org
    },
    {
      name: 'aws_access_key',
      uri: 'https://api.github.com/search/code?q=AWS_ACCESS_KEY+user:' + org
    },
    {
      name: 'aws_secret_key',
      uri: 'https://api.github.com/search/code?q=AWS_SECRET_KEY+user:' + org
    },
    {
      name: 'id_rsa',
      uri: 'https://api.github.com/search/code?q=id_rsa+in:path+user:' + org
    },
    {
      name: '.key',
      uri: 'https://api.github.com/search/code?q=extension:key+user:' + org
    },
    {
      name: '.pem',
      uri: 'https://api.github.com/search/code?q=extension:pem+user:' + org
    },
    {
      name: '.salt',
      uri: 'https://api.github.com/search/code?q=extension:salt+user:' + org
    },
    {
      name: 'x-oauth-basic',
      uri: 'https://api.github.com/search/code?q=x-oauth-basic+user:' + org
    }
  ]

  return function (cb) {
    mapLimit(uris, Infinity, iterator, function (err, arrs) {
      if (err) return cb(err)
      const flat = arrs.reduce(function (total, arr) {
        return total.concat(arr)
      }, [])

      cb(null, flat)
    })

    function iterator (opt, cb) {
      const uri = opt.uri
      const name = 'credentials:' + opt.name

      ghutils.ghget(auth, uri, ghOpts, function (err, res) {
        if (err) return cb(err)
        if (res.total_count === 0) return cb(null, [])

        const errs = res.items.reduce(function (arr, item) {
          arr.push({ name: name, type: 'fail', data: item.html_url })
          return arr
        }, [])

        errs.push({
          name: name,
          type: 'summary',
          data: { fail: errs.length }
        })

        cb(null, errs)
      })
    }
  }
}
