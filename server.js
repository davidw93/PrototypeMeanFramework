var mongoose    = require("mongoose");

var config      = require("./server/config"); //load the server-only config files
var app         = {};

var db          = mongoose.connect(config.database.Development.db, function(err) {
    if(err) {
        console.error("Error: " + err.message);
        return console.error("Couldn't connect to MongoDB");
    }

    app = require("./server/config/bootstrap")(db);
    app.listen(config.server.port, config.server.hostname);

    console.log("Server now listening on " + config.server.port);
});

