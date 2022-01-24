'use strict';

module.exports = core;

// require .js|.json|.node
// .js file output -> module.exports|exports
// .json file -> JSON.parse
// any file -> .js
const pkg = require('../package.json')

const log = require('@hard-to-build/cli-log')

function core() {
    checkVersion()
}

function checkVersion() {
    log.notice('cli', pkg.version)
}
