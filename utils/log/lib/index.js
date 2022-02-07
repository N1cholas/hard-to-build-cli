'use strict';

const log = require('npmlog')

log.heading = '👉'
log.addLevel('success', 2000, { fg: 'green' })

module.exports = log;
