'use strict';

const Package = require('@hard-to-build/cli-package')
const path = require('path')
const log = require('@hard-to-build/cli-log')

const pkgMapping = {
    'init': '@hard-to-build/cli-init'
}
const CACHE_DIR = 'dependencies/'

function exec() {
    let targetPath = process.env.CLI_TARGET_PATH
    let storeDir
    const homePath = process.env.CLI_HOME
    const command = arguments[arguments.length - 1]
    
    if (!targetPath) {
        targetPath = path.resolve(homePath, CACHE_DIR)
        storeDir = path.resolve(targetPath, 'node_modules')
    }

    const pkg = new Package({
        targetPath,
        storeDir,
        packageName: pkgMapping[command.name()],
        packageVersion: 'latest'
    })
    
    log.verbose('targetPath', targetPath)
    log.verbose('storeDir', storeDir)
    log.verbose('single pkg entry', pkg.getEntry())
}

module.exports = exec;

