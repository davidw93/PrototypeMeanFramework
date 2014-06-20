"use strict";

var express     = require("express"),
    config      = require("../config"),
    appPath     = process.cwd(),
    fs          = require("fs"),
    util        = require("../../system/lib/util");

module.exports = function(app, database) {
    app.set("showStackError", true);

    //Make the HTML pretty
    app.locals.pretty = true;

    app.locals.cache = "memory";

    app.set("view engine", "html");
    app.enable("jsonp callback");

    function bootstrapRoutes() {
        util.walk(appPath + "/server", "route", "middlewares", function(path) {
            require(path)(app);
        });
    };

    //Load all the routes
    bootstrapRoutes();
}
