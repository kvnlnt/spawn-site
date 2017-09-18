const app = require('./app.json');
const chalk = require('chalk');
const Clean = require('./tasks/clean');
const Deploy = require('./tasks/deploy');
const Dev = require('./tasks/dev');
const Build = require('./tasks/build');
const fs = require('fs');
const package = require('./package');
const program = require('commander');

// TITLE

console.log('');
console.log(chalk.cyan('EVIDENCE FINDER'));
console.log('');

// SETUP

program.version(package.version);

// COMMANDS

program
    .command('clean')
    .description('clean project')
    .action(function() {
        new Clean();
    });

program
    .command('dev')
    .description('spin up dev server')
    .option("-l, --launch <launch>", "Autolaunch the browser", true)
    .option("-r, --report <report>", "stdout requests", true)
    .option("-p, --port <port>", "specify port", true)
    .action(function(options) {
        new Dev({
            autoLaunch: options.launch
        });
    });

program
    .command('build')
    .description('create build')
    .action(function(options) {
        new Clean();
        new Build();
    });

program
    .command('deploy <env>')
    .description('deploy to test server')
    .action(function(env) {
        new Clean();
        new Build();
        new Deploy(env);
    });


// auto run help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// RUN

program.parse(process.argv);