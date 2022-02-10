'use strict';

const Package = require('@hard-to-build/cli-package')
const path = require('path')

const pkgMapping = {
    'init': '@hard-to-build/cli-init'
}
const CACHE_DIR = 'dependencies/'

async function exec() {
    const homePath = process.env.CLI_HOME
    const targetPath = process.env.CLI_TARGET_PATH ?
        process.env.CLI_TARGET_PATH :
        path.resolve(homePath, CACHE_DIR)
    
    const commandName = arguments[arguments.length - 1].name()
    
    const pkg = new Package({
        targetPath,
        packageName: pkgMapping[commandName],
        packageVersion: 'latest'
    })

    if (pkg.exist()) {
        await pkg.update()
    } else {
        await pkg.install()
    }
    
    const entryFilePath = pkg.getEntry()
    
    if (entryFilePath) {
        require(entryFilePath).apply(null, arguments)
    }
}

module.exports = exec;

