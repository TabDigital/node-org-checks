# github-security-checks [![stability][0]][1]
[![js-standard-style][10]][11]

Perform security checks on GitHub.

## Checks
- [scrape credentials](https://github.com/TabDigital/node-github-credential-scraper)

## Installation
```sh
$ git clone https://github.com/TabDigital/github-security-checks
```

## Usage
```js
const checkCredentials = require('monitorg/checks/credentials')
const toHipchat = require('monitor/reporters/hipchat')
const aggregator = require('monitorg')

const hipchatAuth = { room: '208899', name: 'monitorg', token: '<token>' }
const ghAuth = { username: 'foobar', token: '<token>' }
const org = 'tabDigital'

const checks = [ checkCredentials(org, ghAuth) ]
monitorg(checks, toHipchat(hipchatAuth))
```

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
 │ chat │    │email │   │  ui  │
 │      │    │      │   │      │
 └──────┘    └──────┘   └──────┘
```

## Copyright
Tab Digital

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/github-security-checks.svg?style=flat-square
[3]: https://npmjs.org/package/github-security-checks
[4]: https://img.shields.io/travis/TabDigital/github-security-checks/master.svg?style=flat-square
[5]: https://travis-ci.org/TabDigital/github-security-checks
[6]: https://img.shields.io/codecov/c/github/TabDigital/github-security-checks/master.svg?style=flat-square
[7]: https://codecov.io/github/TabDigital/github-security-checks
[8]: http://img.shields.io/npm/dm/github-security-checks.svg?style=flat-square
[9]: https://npmjs.org/package/github-security-checks
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
