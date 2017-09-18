const express = require('express');
const app = require('../app.json');
const path = require("path");
const fs = require('fs');
const util = require("./util");
const chalk = require("chalk");

function Dev(config) {
    var config = config || {};
    this.autoLaunch = config.autoLaunch === 'false' ? false : true;
    this.report = config.report === false ? false : true;
    this.port = config.port || 3000;
    this.server = null;
    this.start();
}

Dev.prototype = {
    start: function() {

        var that = this;
        this.server = express();

        // configure express server
        this.server.use('/bower_components', this.reporting.bind(this), express.static('bower_components'));
        this.server.use('/src', this.reporting.bind(this), express.static('src'));
        this.server.use('/assets', this.reporting.bind(this), express.static('assets'));

        // register routes
        this.server.get('/', function(req, res) {

            var js = util.wrapInScriptTag(util.flatten(app.js));
            var css = util.wrapInCssLinkTag(util.flatten(app.css));

            // now update the main template
            var template = fs.readFileSync("./src/templates/main.html", 'utf8');
            template = template
                .replace("<!-- META.title -->", app.meta.title)
                .replace("<!-- META.author -->", app.meta.author)
                .replace("<!-- META.descr -->", app.meta.descr)
                .replace("<!-- META.keywords -->", app.meta.keywords)
                .replace("<!-- CSS -->", css)
                .replace("<!-- JS -->", js);

            res.send(template);

            // res.sendFile(path.join(__dirname+'/templates/dev.html'));
        });

        this.server.listen(this.port, this.reply.bind(this));
    },
    stop: function (argument) {
        this.server.close();
    },
    reporting: function(req, res, next){
        if(this.report) {
            return util.report(req, res, next);
        } else {
            return next();
        }
    },
    reply: function() {
        console.log(chalk.cyan("\u2713"), chalk.white("Dev"));
        console.log('Open: http://localhost:3000');
    }
};

module.exports = Dev;