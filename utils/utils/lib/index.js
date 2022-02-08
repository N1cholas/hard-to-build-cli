'use strict';

const path = require('path')

module.exports = {
    formatPath (path) {
        const sep = path.sep
        
        if (sep === '/') {
            return path
        } else {
            return path.replace(/\\/g, '/')
        }
    }
};
