"use strict";

var framework   = require("../../system/framework");
var controllers = framework.load("controllers");

function loadControllerIndex(controller, req, res) {
    console.log("Loading Controller: " + controller);
    var stored_controller = controllers[controller];
    if(stored_controller !== undefined) {
        stored_controller["index"](req, res);
    } else {
        return res.json({"msg": "Not Found"});
        //[TODO] Make a 404 not found template to serve here
    }
}

function loadControllerFunction(controller, func, req, res) {
    console.log("Loading Controller: " + controller, " with Function: " + func);
    var stored_controller = controllers[controller];
    if(stored_controller !== undefined && stored_controller[func] !== undefined) {
        stored_controller[func](req, res);
    } else {
        return res.json({"msg": "Not Found"});
        //[TODO] Make a 404 not found template to serve here
    }
}

module.exports = function(app) {
    //Wildcard get requests for all routes to use custom logic to load
    //appropriate controllers
    app.get("/*", function(req, res) {
        var slug = req.path;
        var uri_parts = slug.split("/");
        uri_parts.shift(); //Remove the first element from the array because it's gumf

        var controller, func;

        if(uri_parts.length == 2){
            controller  = uri_parts[0];
            func        = uri_parts[1];
            loadControllerFunction(controller, func, req, res);
        } else if(uri_parts.length == 1){
            controller = uri_parts[0];
            loadControllerIndex(controller, req, res);
        }
    });
};
