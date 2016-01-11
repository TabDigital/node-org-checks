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
- __credential-scraper:__ check existance of `AWS_KEY`, `.pem`, `id_rsa` and
  `.key` files

## Installation
```sh
$ git clone https://github.com/TabDigital/org-checks
```

## Usage
```js
const checkCredentials = require('org-checks/checks/credentials')
const toHipchat = require('monitor/reporters/hipchat')
const toHtml = require('monitor/reporters/html')
const orgChecks = require('org-checks')

const hipchatAuth = { room: '208899', token: '<token>' }
const ghAuth = { username: 'foobar', token: '<token>' }
const org = 'tabDigital'

const reporters = [ toHipchat(hipchatAuth), toHtml('/tmp/org-status.html') ]
const checks = [ checkCredentials(org, ghAuth) ]
orgChecks(checks, reporters)
```

## Copyright
Tab Digital

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
