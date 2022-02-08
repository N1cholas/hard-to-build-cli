'use strict';

function init(projectName, options, command) {
    console.log(projectName, options, command.parent.opts(), process.env.CLI_TARGET_PATH)
}

module.exports = init
