'use strict';

module.exports = core;

// require .js|.json|.node
// .js file output -> module.exports|exports
// .json file -> JSON.parse
// any file -> .js
const path = require('path')
const semver = require('semver')
const colors = require('colors/safe')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const pkg = require('../package.json')
const constants = require('./const')
const log = require('@hard-to-build/cli-log')
const { getPkgVersions, getSemverVersions } = require('get-pkg-info')

const args = require('minimist')(process.argv.slice(2))

async function core() {
    try {
        checkVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
        checkArgs()
        checkEnv()
        await checkUpdate()
    } catch (e) {
        log.error(e.message)
    }
}

async function checkUpdate() {
    const latestVersion = await getSemverVersions(pkg.name, pkg.version)
    
    if (latestVersion && semver.gt(latestVersion, pkg.version)) {
        log.warn(colors.yellow(`please install latest version ${latestVersion}, current version is ${pkg.version}.
        $ npm install ${pkg.name}`))
    }
}

function checkEnv() {
    const dotenv = require('dotenv')
    const dotenvPath = path.resolve(userHome, '.env')
    const config = dotenv.config({path: dotenvPath})
    
    if (pathExists(dotenvPath) && config) {
        process.env.CLI_HOME = config.parsed.CLI_HOME
    } else {
        process.env.CLI_HOME = path.join(userHome, constants.DEFAULT_CLI_HOME)
    }
    
    log.verbose('env', process.env.CLI_HOME)
}

function checkArgs() {
    if (args.debug) {
        process.env.LOG_LEVEL = 'verbose'
    } else {
        process.env.LOG_LEVEL = 'info'
    }
    
    log.level = process.env.LOG_LEVEL
}

function checkUserHome() {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red(`user home is not exists`))
    }
    log.verbose('userHome', userHome)
}

function checkRoot() {
    require('root-check')()
 }

function checkNodeVersion() {
    const currentVersion = process.version
    const lowestVersion = constants.LOWEST_NODE_VERSION
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`my-cli need at least ${lowestVersion} node version`))
    }
}

function checkVersion() {
    log.info('my-cli', pkg.version)
}
