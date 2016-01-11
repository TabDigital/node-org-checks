# org-checks [![stability][0]][1]
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
     │  aggregator  ◀ ─ ─│creds│
     └──────────────┘    └─────┘
             │
     ┌───────┴───┬──────────┐
     │           │          │
 ┌───▼──┐    ┌───▼──┐   ┌───▼──┐
 │ hip- │    │      │   │      │
 │ chat │    │email │   │ html │
 │      │    │      │   │      │
 └──────┘    └──────┘   └──────┘
```

## Outputs
- hipchat
- stdout

## Inputs
### credentials(organization, opts)
Check existance of `AWS_KEY`, `.pem`, `id_rsa` and `.key` files. Opts has the
following fields:
- __user:__ GitHub user (required)
- __token:__ GitHub OpenAuth token (required)

## Installation
```sh
$ git clone https://github.com/TabDigital/org-checks
```

## Usage
```js
const checkCredentials = require('org-checks/input/credentials')
const toHipchat = require('monitor/output/hipchat')
const toHtml = require('monitor/output/html')
const orgChecks = require('org-checks')

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
{ "name": "scraper:aws-keys", "type": "error", data": "https://binbaz.com" }
{ "name": "scraper:aws-keys", "type": "error", "data": "https://foobar.com" }
{ "name": "scraper:aws-keys", "type": "summary", "data": { total: 40, pass: 24, fail: 16 } }
```
There are 2 types that can be returned:
- __error:__ an error has occured, a string is included to point to the
  corresponding error.
- __summary:__ a test has finished running and has a `total`, `pass` and `fail`
  count. Useful for short form reporters.

## License
MIT

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/org-checks.svg?style=flat-square
[3]: https://npmjs.org/package/org-checks
[4]: https://img.shields.io/travis/TabDigital/org-checks/master.svg?style=flat-square
[5]: https://travis-ci.org/TabDigital/org-checks
[6]: https://img.shields.io/codecov/c/github/TabDigital/org-checks/master.svg?style=flat-square
[7]: https://codecov.io/github/TabDigital/org-checks
[8]: http://img.shields.io/npm/dm/org-checks.svg?style=flat-square
[9]: https://npmjs.org/package/org-checks
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
