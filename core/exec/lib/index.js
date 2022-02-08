'use strict';

const Package = require('@hard-to-build/cli-package')
const path = require('path')
const log = require('@hard-to-build/cli-log')

const pkgMapping = {
    'init': '@hard-to-build/cli-init'
}
const CACHE_DIR = 'dependencies/'

async function exec() {
    let targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME
    const command = arguments[arguments.length - 1]
    
    if (!targetPath) {
        targetPath = path.resolve(homePath, CACHE_DIR)
    }

    const pkg = new Package({
        targetPath,
        packageName: pkgMapping[command.name()],
        packageVersion: 'latest'
    })
    
    log.verbose('targetPath', targetPath)
    log.verbose('storeDir', path.resolve(targetPath, 'node_modules'))

    if (pkg.exist()) {
        // update
    } else {
        await pkg.install()
    }
    
    const entryFile = pkg.getEntry()
    log.verbose('single pkg entry', entryFile)
    
    require(entryFile).apply(null, arguments)
}

module.exports = exec;

