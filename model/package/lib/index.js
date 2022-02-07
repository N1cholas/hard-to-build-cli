'use strict';

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
}

module.exports = Package;
