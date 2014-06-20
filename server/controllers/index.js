"use strict";

var collectExports,
    extend,
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

        var fname = file.replace(/\.[^/.]+$/, "");
        exports[fname] = {};
        for(func in include) {
            /*
             *  hasOwnProperty allows us to determine whether an object has the
             *  specified property as a direct property of that object. This
             *  method call does not check the object's prototype chain.
             */
            if(!__hasProp.call(include, func)) continue;
            //Add to results and also set the module exports function for this
            _results.push(exports[fname][func] = include[func]);
        }
        return _results; //Return all the properties we've found that were valid
    }
};

//Synchronously read the contents of the /config directory and call
//collectExports method on each file found.
fs.readdirSync("./server/controllers").forEach(collectExports);
