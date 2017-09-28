const exec = require('child_process').exec;
const chalk = require("chalk");

function Deploy(options) {
    console.log(options.test, options.username);
    if(options.test) return this.deployToTestEnv(options.username);
    return this.deployToProdEnv();
}

Deploy.prototype = {
    deployToTestEnv: function(username){
        // DIY
    },
    // TODO
    deployToProdEnv: function(){
      console.log('');
      console.log(chalk.red('X'), 'Nothing happened, only test deployments have been setup');
    }
};

module.exports = Deploy;