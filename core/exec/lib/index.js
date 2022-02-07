'use strict';

const Package = require('@hard-to-build/cli-package')

function exec() {
    const targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME
    const command = arguments[arguments.length - 1]
    
    const pkgMapping = {
        'init': '@hard-to-build/cli-init'
    }

    const pkg = new Package({
        targetPath,
        homePath,
        packageName: pkgMapping[command.name()],
        packageVersion: 'latest'
    })
    
    console.log(pkg)
}

module.exports = exec;

