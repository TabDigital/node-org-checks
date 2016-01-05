const parser = require('tap-parser')

const goRoute = 'https://go.tabdigital.com.au/go/tab/pipeline/history/GithubSecurityChecks'


const ws = parser(function (results) {
  if (!results.ok) return
  const fmt = `Status: ${results.ok ? 'PASSED' : 'FAILED'}
    Count: ${results.count}
    Failed: ${results.fail}
    Visit ${goRoute} for test details
  `
  process.stdout.write(fmt)
})

process.stdin.pipe(ws)
