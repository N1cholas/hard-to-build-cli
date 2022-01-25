'use strict';

module.exports = core;

// require .js|.json|.node
// .js file output -> module.exports|exports
// .json file -> JSON.parse
// any file -> .js
const semver = require('semver')
const colors = require('colors/safe')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const pkg = require('../package.json')
const constants = require('./const')
const log = require('@hard-to-build/cli-log')

function core() {
    try {
        checkVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
    } catch (e) {
        log.error(e.message)
    }
}

function checkUserHome() {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red(`user home is not exists`))
    }
}

function checkRoot() {
    require('root-check')()
 }

function checkNodeVersion() {
    const currentVersion = process.version
    const lowestVersion = constants.LOWEST_NODE_VERSION
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`long-cli need at least ${lowestVersion} node version`))
    }
}

function checkVersion() {
    log.notice('cli', pkg.version)
}
