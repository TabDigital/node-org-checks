# node-org-checks [![stability][0]][1]
[![js-standard-style][10]][11]

Organization monitoring and reporting to ensure standards are in place for
every aspect of an organization.

## Architecture
```txt
 ┌──────┐    ┌──────┐   ┌──────┐
 │check │    │assert│   │verify│
 │creden│    │tests │   │ org  │
 │tials │    │exist │   │ 2FA  │
 └──────┘    └──────┘   └──────┘
     │           │          │
     └─────┬─────┴──────────┘
           │
     ┌─────▼────────┐    ┌─────┐
     │    device    ◀ ─ ─│creds│
     └──────────────┘    └─────┘
             │
     ┌───────┴───┬──────────┐
     │           │          │
 ┌───▼──┐    ┌───▼──┐   ┌───▼──┐
 │ hip- │    │      │   │      │
 │ chat │    │ xml  │   │stdout│
 │      │    │      │   │      │
 └──────┘    └──────┘   └──────┘
```

## Input
### credentials(organization, opts)
Check existance of `AWS_KEY`, `.pem`, `id_rsa` and `.key` files. Opts has the
following fields:
- __user:__ GitHub user (required)
- __token:__ GitHub OpenAuth token (required)

### stale(organization, auth, opts?)
Check for stale repositories. By default projects are considered stale after 6
months of no updates. Opts has the following fields:
- __offset:__ offset in months before a project is considered stale. Defaults
  to 6

## Output
### stdout(opts)
Report to stdout. If `opts.summary=true` it will report a summary only.

### hipchat(opts)
Report a summary to HipChat. Opts has the following fields:
- __token:__ HipChat authentication token
- __room:__ room id to report to

### xunit(opts)
Report a summary in xunit `xml`. Useful to integrate with CI solutions. Unlike
other reporters, this will be reported as `pass / fail`. Opts has the following
fields:
- __output:__ path to write to. Writes to `process.stdout` by default
- __fail:__ determine if errors should be reported. Defaults to `true`

### csv(opts)
Transforms output into a stream of `csv`. Can either write to stdout or a file.
`opts` has the following fields:
- __output:__ path to write to. Writes to `process.stdout` by default

## Installation
```sh
$ git clone https://github.com/TabDigital/org-checks
```

## Usage
```js
const checkCredentials = require('org-checks/input/credentials')
const toHipchat = require('org-checks/output/hipchat')
const toHtml = require('org-checks/output/html')
const orgChecks = require('org-checks/device')

const hipchatAuth = { room: '208899', token: '<token>' }
const ghAuth = { username: 'foobar', token: '<token>' }
const org = 'tabDigital'

const output = [ toHipchat(hipchatAuth), toHtml('/tmp/org-status.html') ]
const input = [ checkCredentials(org, ghAuth) ]
orgChecks(input, output)
```

## Device format
Each input should return data in the following format to the device:
```json
{ "name": "credentials:aws-keys", "type": "error", "data": "https://binbaz.com" }
{ "name": "credentials:.pem", "type": "error", "data": "https://foobar.com" }
{ "name": "credentials:aws-keys", "type": "summary", "data": { "total": 40, "pass": 24, "fail": 16 } }
```
There are 2 types that can be returned:
- __error:__ an error has occured, a string is included to point to the
  corresponding error.
- __summary:__ a test has finished running and has a `total`, `pass` and `fail`
  count. Useful for short form reporters. If there is no total count (e.g.
  cannot be expressed as a percentage), only the `fail` key should be included.

The `name` key can be namespaced using `:` to distinguish between topics and
sub topics. This distinction is useful for output formatters to control the
amount of detail to display.

## License
MIT

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/org-checks.svg?style=flat-square
[3]: https://npmjs.org/package/org-checks
[4]: https://img.shields.io/travis/TabDigital/node-org-checks/master.svg?style=flat-square
[5]: https://travis-ci.org/TabDigital/node-org-checks
[6]: https://img.shields.io/codecov/c/github/TabDigital/node-org-checks/master.svg?style=flat-square
[7]: https://codecov.io/github/TabDigital/node-org-checks
[8]: http://img.shields.io/npm/dm/org-checks.svg?style=flat-square
[9]: https://npmjs.org/package/org-checks
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
