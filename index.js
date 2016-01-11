const scrapeCreds = require('./checks/credentials')
const assert = require('assert')
const test = require('tape')

const ghToken = process.env.GITHUB_TOKEN
const ghUser = process.env.GITHUB_USER

assert.ok(ghToken, 'github token exists')
assert.ok(ghUser, 'github user exists')

const auth = { token: ghToken, user: ghUser }

scrapeCreds('TabDigital', auth, function (err, res) {
  assert.ifError(err)
  res.forEach(function (obj) {
    test(obj.name, function (t) {
      if (!obj.data.length) return t.pass('no errors')
      obj.data.forEach(function (str) {
        t.fail(str)
      })
      t.end()
    })
  })
})
