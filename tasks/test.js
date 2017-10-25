const path = require("path");
const fs = require('fs-extra');
const chalk = require('chalk');
const spawn = require('child_process').spawn;


function Test() {
    this.run();
}

Test.prototype = {

    run: function(){

        console.log(chalk.cyan("\u2713"), chalk.white("...Running Tests"));

        const cmd = spawn('mocha', ['-c']);

        cmd.stdout.on('data', (data) => {
         console.log(`${data}`);
        });

        cmd.stderr.on('data', (data) => {
         console.error(chalk.red("X"), `${data}`);
        });

        cmd.on('close', (code) => {
         console.log(chalk.cyan("\u2713"), chalk.white("Test Completed"));
        });

        return this;
    }
};

module.exports = Test;