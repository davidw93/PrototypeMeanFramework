"use strict";

var express     = require("express"),
    config      = require("../config"),
    appPath     = process.cwd(),
    fs          = require("fs");

module.exports = function(app, database) {
    app.set("showStackError", true);

    //Make the HTML pretty
    app.locals.pretty = true;

    app.locals.cache = "memory";

    app.set("view engine", "html");
    app.enable("jsonp callback");
}
