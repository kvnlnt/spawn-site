const app = require('./app.json');
const chalk = require('chalk');
const Clean = require('./tasks/clean');
const Dev = require('./tasks/dev');
const Build = require('./tasks/build');
const Test = require('./tasks/test');
const fs = require('fs');
const pkg = require('./package');
const program = require('commander');

// TITLE

console.log('');
console.log(chalk.cyan(app.meta.title));
console.log('');

// SETUP

program.version(pkg.version);

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
    .command('test')
    .description('build and run mocha tests')
    .action(function(options) {
        new Clean();
        new Build();
        new Test();
    });

// auto run help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// RUN

program.parse(process.argv);