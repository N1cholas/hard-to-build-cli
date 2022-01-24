#! /usr/bin/env node

const importLocal = require('import-local')

if (importLocal(__filename)) {
    require('npmlog').info('cli', 'use dev version')
} else {
    require('../lib/index')(process.argv.slice(2))
}
