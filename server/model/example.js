"use strict";

/*
 * Everything in mongoose is supported in these files
 * Mongoose Docs: http://mongoosejs.com/docs/2.7.x/index.html
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

/*
 * Define the schema for the DB
 */
var ExampleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
    }
});


//Give mongoose a model name for the schema you've created above
mongoose.model("Example", ExampleSchema);
