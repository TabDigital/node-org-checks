const parser = require('tap-parser')

const goRoute = 'https://go.tabdigital.com.au/go/tab/pipeline/history/GithubSecurityChecks'

const ws = parser(function (results) {
  const status = results.ok ? 'PASSED' : 'FAILED'
  if (!results.ok) return
  var fmt = 'Status: ' + status + '\n'
  fmt += 'Count: ' + results.count + '\n'
  fmt += 'Failed: ' + results.fail + '\n'
  fmt += 'Visit ' + goRoute + ' for test details\n'
  process.stdout.write(fmt)
})

process.stdin.pipe(ws)
