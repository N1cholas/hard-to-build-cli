'use strict';

function index(projectName, options, command) {
    console.log(projectName, options, command.parent.opts(), process.env.CLI_TARGET_PATH)
}

module.exports = index
