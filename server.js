var mongoose    = require("mongoose");

var dependencies= require("./system/registry"),
    registry    = dependencies.registry();
var config      = require("./server/config"); //load the server-only config files
var app         = {};

var db          = mongoose.connect(config.database.Development.db, function(err) {
    if(err) {
        console.error("Error: " + err.message);
        return console.error("Couldn't connect to MongoDB");
    }
});

console.log(config);
