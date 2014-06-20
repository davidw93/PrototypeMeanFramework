"use strict";

var express = require("express"),
    appPath = process.cwd();

framework.app("Prototype Framework", {});

module.exports = function(database) {

    function loadControllers() {
        var controllerListObject = require("../controllers");
        framework.register("controllers", controllerListObject);
    }
    loadControllers();

    function loadBootstrapModels() {
        require("../../system/lib/util").walk(appPath + "/server", "model", null, function(path) {
            require(path);
        });
    }
    loadBootstrapModels();

    function loadBootstrapDependencies() {
        //Register our database dependency
        framework.register("database", {
            connection: database
        });

        framework.register("app", function() {
            return app;
        });
    }
    loadBootstrapDependencies();

    var app = express();
    require("./express")(app, database);

    return app;
};
