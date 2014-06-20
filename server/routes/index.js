"use strict";

module.exports = function(app) {
    //Wildcard get requests for all routes to use custom logic to load
    //appropriate controllers
    app.get("/*", function(req, res) {
        
    });
};
