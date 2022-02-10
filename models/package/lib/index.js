'use strict';

const pkgDir = require('pkg-dir').sync
const path = require('path')
const { formatPath } = require('@hard-to-build/cli-utils')
const npmInstall = require('npminstall')
const pathExist = require('path-exists').sync
const log = require('@hard-to-build/cli-log')
const { getLatestVersion } = require('@hard-to-build/get-pkg-info')

class Package {
    constructor(options) {
        if (!options || Object.prototype.toString.call(options) !== '[object Object]') {
            throw new Error('invalid options when creating Package')
        }
        
        this.name = options.packageName
        this.currentVersion = options.packageVersion
        this.targetPath = options.targetPath
    }
    
    async prepare () {
        this.latestVersion = await getLatestVersion(this.name)
        log.verbose(`${this.name} latest version`, this.latestVersion)
    }
    
    get storePath () {
        return path.resolve(this.targetPath, 'node_modules')
    }
    
    get cacheFilePath () {
        return path.resolve(
            this.storePath,
            `_${this.name.replace('/', '_')}@${this.latestVersion}@${this.name}`
        )
    }
    
    getEntry() {
        function _getEntry(targetPath) {
            log.verbose('target path:\n', targetPath)
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
        
        log.verbose('entry path:\n', entryPath)
        
        return entryPath
    }
    
    async install () {
        return await npmInstall({
            root: this.targetPath,
            pkgs: [{
                name: this.name,
                version: this.currentVersion
            }]
        })
    }
    
    exist (path) {
        return path ? pathExist(path) : pathExist(this.targetPath)
    }
    
    async update () {
        await this.prepare()
        log.verbose('cache file path \n', this.cacheFilePath)
        if (!pathExist(this.cacheFilePath)) {
            return await npmInstall({
                root: this.targetPath,
                pkgs: [{
                    name: this.name,
                    version: this.latestVersion
                }]
            })
        }
        log.verbose(`${this.name}`, 'already up-to-date')
    }
}

module.exports = Package;
