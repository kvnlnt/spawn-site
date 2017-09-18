const app = require('../app');

/**
 * columnize text
 *
 * @param      {<type>}  text         The text
 * @param      {number}  longestText  The longest text
 * @return     {string}  { description_of_the_return_value }
 */
function padTextToColumn(text, column){
    var spaces = column - text.length;
    var padding = '';
    for(i = 0; i < spaces; i++){
        padding += ' ';
    }
    return text + padding;
}

/**
 * Get args
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
function args(){
  return process.argv.filter(function(arg, i) {
    return i > 1;
  });
}

/**
 * Log http requests
 *
 * @param      {<type>}    req     The request
 * @param      {<type>}    res     The resource
 * @param      {Function}  next    The next
 */
function report(req, res, next) {
  console.log('Served:', req.url);
  next();
}

/**
 * Load script tags
 * @param  {[type]} files [description]
 * @return {[type]}       [description]
 */
function wrapInScriptTag(files) {
  var tags = '';
  files.forEach(function (file) {
    tags += '<script src="' + file + '"></script>\n';
  });
  return tags;
}

/**
 * Load script tags
 * @param  {[type]} files [description]
 * @return {[type]}       [description]
 */
function wrapInCssLinkTag(files) {
  var tags = '';
  files.forEach(function (file) {
    tags += '<link rel="stylesheet" type="text/css" href="' + file + '">\n';
  });
  return tags;
}

/**
 * flatten array of arrays
 */
function flatten(arrayOfArrays) {
  return [].concat.apply([], arrayOfArrays);
}

/**
 * Gets the file set from src in package.json
 *
 * @param      {<type>}  sourceSet  The source set
 */
function getSourceFiles(set) {
  return app.src[set];
}

module.exports = {
    args:args,
    padTextToColumn: padTextToColumn,
    report: report,
    getSourceFiles: getSourceFiles,
    wrapInScriptTag: wrapInScriptTag,
    wrapInCssLinkTag: wrapInCssLinkTag,
    flatten: flatten
}