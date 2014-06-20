"use strict";

var framework = require("../../system/framework");

exports.render = function(req, res) {
    return res.json({"msg": "hello"});
};
