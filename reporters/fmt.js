const stream = require('readable-stream')
const parser = require('tap-parser')
const table = require('text-table')

const goRoute = 'https://go.tabdigital.com.au/go/tab/pipeline/history/GithubSecurityChecks'

process.stdin
const ws = process.stdin.pipe(parser())
ReporterStream(ws).pipe(process.stdout)

// turn a tap-stream into a reporter stream
// rs -> rs
function ReporterStream (tapStream) {
  const pts = new stream.PassThrough()

  const tableData = []
  var cache = null

  tapStream.on('complete', function () {
    pushToTable()
    pts.push(table(tableData, { align: [ 'l', 'r' ] }))
    pts.end('\n' + goRoute)
  })

  tapStream.on('comment', function (comment) {
    if (/^# tests/.test(comment)) return
    if (/^# pass/.test(comment)) return
    if (/^# fail/.test(comment)) return
    if (cache) pushToTable()
    const name = comment.replace(/^#/, '').replace(/\n/, '')
    cache = { name: name, count: 0 }
  })

  tapStream.on('assert', function (assert) {
    cache.count += 1
  })

  return pts

  function pushToTable () {
    tableData.push([cache.name, cache.count + ' problems detected'])
  }
}
