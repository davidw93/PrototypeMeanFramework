"use strict";
/*
 *  Loader for all Configuration Files.
 *
 *  All functions + properties found across all files within this directory are
 *  returned grouped together.
 *
 *  If a file should have it's own object grouping within the export then the
 *  module.exports should be appended with the object title. Example:
 *  module.exports.config1 would create a config1 object within the exports
 *  returned by this file.
 */

var collectExports,
    fs = require("fs"),
    path = require("path"),
    __hasProp = {}.hasOwnProperty;

collectExports = function(file) {
    var func, include, _results;

    //Make sure we're looking at a JS file and it's not the index, otherwise
    //this could be horribly wrong for us
    if(path.extname(file) == ".js" && file !== "index.js") {
        include = require("./" + file);
        _results = [];
        for(func in include) {
            /*
             *  hasOwnProperty allows us to determine whether an object has the
             *  specified property as a direct property of that object. This
             *  method call does not check the object's prototype chain.
             */
            if(!__hasProp.call(include, func)) continue;
            _results.push(exports[func] = include[func]); //Everything looks good so we can definitely add this prop to results
        }
        return _results; //Return all the properties we've found that were valid
    }
};

//Synchronously read the contents of the /config directory and call
//collectExports method on each file found.
fs.readdirSync("./server/config").forEach(collectExports);
