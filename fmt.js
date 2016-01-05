const parser = require('tap-parser')

const goRoute = 'https://go.tabdigital.com.au/go/tab/pipeline/history/GithubSecurityChecks'


const ws = parser(function (results) {
  const fmt = `Status: ${results.ok ? 'PASSED' : 'FAILED'}
    Count: ${results.count}
    Failed: ${results.fail}
  `
  process.stdout.write(fmt)
  if (!results.ok) {
    process.stdout.write(`Visit ${goRoute} for test details`)
  }
})

process.stdin.pipe(ws)
