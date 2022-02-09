'use strict';

const pkgDir = require('pkg-dir').sync
const path = require('path')
const { formatPath } = require('@hard-to-build/cli-utils')
const npmInstall = require('npminstall')
const pathExist = require('path-exists').sync
const log = require('@hard-to-build/cli-log')

class Package {
    constructor(options) {
        if (!options || Object.prototype.toString.call(options) !== '[object Object]') {
            throw new Error('invalid options when creating Package')
        }
        
        this.name = options.packageName
        this.version = options.packageVersion
        this.targetPath = options.targetPath
    }
    
    getEntry() {
        function _getEntry(targetPath) {
            log.verbose('target path:', targetPath)
            const dir = pkgDir(targetPath)
    
            if (dir) {
                const pkgFile = require(path.resolve(dir, 'package.json'))
        
                if (pkgFile && pkgFile.main) {
                    return formatPath(path.resolve(dir, pkgFile.main))
                }
            }
    
            return null
        }
        
        const entryPath = pkgDir(this.targetPath) ?
            _getEntry(this.targetPath) :
            _getEntry(path.resolve(this.targetPath, `node_modules/${this.name}`))
        
        log.verbose('entry path:', entryPath)
        
        return entryPath
    }
    
    async install () {
        return await npmInstall({
            root: this.targetPath,
            pkgs: [{
                name: this.name,
                version: this.version
            }]
        })
    }
    
    exist (path) {
        return path ? pathExist(path) : pathExist(this.targetPath)
    }
}

module.exports = Package;
