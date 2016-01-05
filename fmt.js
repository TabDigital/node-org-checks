const parser = require('tap-parser')

const ws = parser(function (results) {
  const status = results.ok ? 'PASSED' : 'FAILED'
  process.stdout.write(`Status: ${status}\n`)

  delete results.failures
  console.log(JSON.stringify(results))
  if (!results.ok) {
    const route = 'https://go.tabdigital.com.au/go/tab/pipeline/history/GithubSecurityChecks'
    process.stdout.write(`Visit ${route} for test details`)
  }
})

process.stdin.pipe(ws)
