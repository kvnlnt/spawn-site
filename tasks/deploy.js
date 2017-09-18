// const exec = require('child_process').exec;

// function DeployTest(username) {
//     this.username = username
//     this.copyToDev().reply();
// }

// DeployTest.prototype = {
//     copyToDev: function(){
//         var cmd = "rsync -auz --progress --exclude '*.svn' ./dist/app/ "+this.username+"@dev.toolhouse.com:/sites/my-leukemia-journey.dev.toolhouse.com/www-root/";
//         exec(cmd, (err, stdout, stderr) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           console.log(stdout);
//           exec('open http://my-leukemia-journey.dev.toolhouse.com');
//         });
//     },
//     reply: function(){
//       console.log(chalk.cyan("\u2713"), chalk.white("Deployed to Test"));
//     }
// };

// module.exports = DeployTest;