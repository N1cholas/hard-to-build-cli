'use strict';

const pkgDir = require('pkg-dir').sync
const path = require('path')
const { formatPath } = require('@hard-to-build/cli-utils')
const npmInstall = require('npminstall')

class Package {
    constructor(options) {
        if (!options || Object.prototype.toString.call(options) !== '[object Object]') {
            throw new Error('invalid options when creating Package')
        }
        
        this.name = options.packageName
        this.version = options.packageVersion
        this.targetPath = options.targetPath
        this.storeDir = options.storeDir
    }
    
    getEntry() {
        const dir = pkgDir(this.targetPath)
        if (dir) {
            const pkgFile = require(path.resolve(dir, 'package.json'))
            
            if (pkgFile && pkgFile.main) {
                return formatPath(path.resolve(dir, pkgFile.main))
            }
        }
        
        return null
    }
    
    install () {
        npmInstall({
            root: this.targetPath,
            pkgs: [{
                name: this.name,
                version: this.version
            }]
        })
    }
}

module.exports = Package;
