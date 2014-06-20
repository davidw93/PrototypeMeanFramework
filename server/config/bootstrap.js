"use strict";

var express = require("express"),
    appPath = process.cwd();

module.exports = function() {
    var app = express();
    return app;
};
