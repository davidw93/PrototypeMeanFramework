"use strict";

var fs  = require("fs"),
    path= require("path");

var baseRegex = /(.*).(js|coffee)$/;

function walk(wpath, type, excludeDir, cb) {
    var regex = new RegExp('(.*)-' + type + '(s?).(js|coffee)$', 'i');
    if(!fs.existsSync(wpath)) return;
    fs.readdirSync(wpath).forEach(function(f) {
        var newPath = path.join(wpath, f);
        var stats = fs.statSync(newPath);

        if(stats.isFile() && (regex.test(f) || (baseRegex.test(f)) && ~newPath.indexOf(type))) {
            cb(newPath);
        } else if(stats.isDirectory() && f !== excludeDir && ~newPath.indexOf(type)) {
            walk(newPath, type, excludeDir, cb);
        }
    });
}

exports.walk = walk;
