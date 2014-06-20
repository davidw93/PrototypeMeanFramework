"use strict";

var express = require("express"),
    appPath = process.cwd();

var framework = require("../../system/framework");

module.exports = function(database) {

    function loadBootstrapModels() {
        require("../../system/lib/util").walk(appPath + "/server", "model", null, function(path) {
            require(path);
        });
    }

    loadBootstrapModels();

    var app = express();
    require("./express")(app, database);
    return app;
};
