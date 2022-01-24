'use strict';

const log = require('npmlog')

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'

log.heading = '👉'
log.addLevel('success', { fg: 'green' })

module.exports = log;
