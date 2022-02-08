'use strict';

const pkgDir = require('pkg-dir').sync
const path = require('path')
const { formatPath } = require('@hard-to-build/cli-utils')

class Package {
    constructor(options) {
        if (!options || Object.prototype.toString.call(options) !== '[object Object]') {
            throw new Error('invalid options when creating Package')
        }
        
        this.name = options.packageName
        this.version = options.packageVersion
        this.targetPath = options.targetPath
        this.homePath = options.homePath
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
}

module.exports = Package;
