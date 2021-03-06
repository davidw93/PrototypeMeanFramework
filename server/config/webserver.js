"use strict";

var path = require("path");
var rootPath = path.normalize(__dirname + "/../..");

var WebServer = {
    root: rootPath,
    port: process.env.PORT || 3000,
    hostname: process.env.HOST || process.env.HOSTNAME || "0.0.0.0"
};

module.exports.server = WebServer;
