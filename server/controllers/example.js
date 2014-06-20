"use strict";

var mongoose = require("mongoose"),
    ExampleModel = mongoose.model("Example");

var Example = {
    index: function(req, res) {
        return res.json({"msg": "testing"});
    },

    testing: function(req, res) {
        /*
         *  The mongoose model above can be used like a normal JS object with
         *  the Mongoose function calls.
         */
        return res.json({"msg": "hopefully this can be found"});
    }
};

module.exports = Example;
