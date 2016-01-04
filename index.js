const scrapeCreds = require('github-credential-scraper')
const assert = require('assert')
const test = require('tape')

const ghToken = process.env.GITHUB_TOKEN
const ghUser = process.env.GITHUB_USER

assert.ok(ghToken, 'github token exists')
assert.ok(ghUser, 'github user exists')

const auth = { token: ghToken, user: ghUser }

test('should not expose any AWS credentials on GitHub', function (t) {
  t.plan(1)
  scrapeCreds('TabDigital', auth, function (err, res) {
    t.ifError(err)
    res = Array.isArray(res) ? res : [ res ]
    res.forEach(function (url) {
      // skip over credential check repo
      if (/node-github-credential-scraper/.test(url)) return
      t.fail(url)
    })
  })
})
