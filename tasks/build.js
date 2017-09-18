const app = require('../app.json');
const fs = require('fs-extra');
const chalk = require("chalk");
const UglifyJS = require("uglify-js");
const UglifyCss = require("uglifycss");
const archiver = require('archiver');

function Build(options) {
    var options = options || {};
    this.compileJs().compileCss().compileHtml().reply();
}

Build.prototype = {

    concatFiles: function(fileList) {
        return fileList.map(function(file) {
            return fs.readFileSync(file, 'utf-8');
        }).join('\n');
    },

    compileCss: function() {
        var concatCss = this.concatFiles(app.css);
        fs.outputFileSync('./build/assets/css/bundle.css', concatCss);
        var minifiedCss = UglifyCss.processString(concatCss);
        fs.writeFileSync('./build/assets/css/bundle.min.css', minifiedCss);
        return this;
    },

    compileHtml: function() {
        var template = fs.readFileSync("./src/templates/main.html", 'utf8');
        var ts = Date.now();
        template = template
            .replace(/<!-- META.title -->/g, app.meta.title)
            .replace(/<!-- META.author -->/g, app.meta.author)
            .replace(/<!-- META.descr -->/g, app.meta.descr)
            .replace(/<!-- META.keywords -->/g, app.meta.keywords)
            .replace(/<!-- META.favicon -->/g, app.meta.favicon)
            .replace("<!-- CSS -->", '<link href="assets/js/bundle.min.css?ts=' + ts + '" rel="stylesheet" type="text/css"/>')
            .replace("<!-- JS -->", '<script src="assets/js/bundle.min.js?ts=' + ts + '"></script>');
        fs.outputFileSync('./build/index.html', template);
        return this;
    },

    compileJs: function() {
        var concatJs = this.concatFiles(app.js);
        fs.outputFileSync('./build/assets/js/bundle.js', concatJs);
        var minifiedJs = UglifyJS.minify('./build/assets/js/bundle.js');
        fs.writeFileSync('./build/assets/js/bundle.min.js', minifiedJs.code);
        return this;
    },

    reply: function() {
        console.log(chalk.cyan("\u2713"), chalk.white("Build"));
    }
};

module.exports = Build;