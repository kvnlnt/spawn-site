const path = require("path");
const fs = require('fs-extra');
const chalk = require('chalk');

function Clean() {
    this.clean().reply();
}

Clean.prototype = {

    clean: function(){
        fs.removeSync('./build');
        return this;
    },

    reply: function() {
        console.log(chalk.cyan("\u2713"), chalk.white("Cleaned"));
    }
};

module.exports = Clean;