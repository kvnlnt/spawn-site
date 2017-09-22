const exec = require('child_process').exec;
const chalk = require("chalk");

function Deploy(options) {
    console.log(options.test, options.username);
    if(options.test) return this.deployToTestEnv(options.username);
    return this.deployToProdEnv();
}

Deploy.prototype = {
    deployToTestEnv: function(username){
        var cmd = "rsync -auz --progress --exclude '*.svn' ./build "+username+"@dev.toolhouse.com:/sites/evidence-finder.dev.toolhouse.com/www-root/";
        exec(cmd, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
        });
        console.log(chalk.cyan("\u2713"), chalk.white("Deployed", "http://evidence-finder.dev.toolhouse.com"));
    },
    // TODO
    deployToProdEnv: function(){
      console.log('');
      console.log(chalk.red('X'), 'Nothing happened, only test deployments have been setup');
    }
};

module.exports = Deploy;