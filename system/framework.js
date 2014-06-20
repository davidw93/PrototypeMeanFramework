"use strict";

var fs = require("fs"),
    path = require("path");

var dependencies= require("./registry"),
    registry    = dependencies.registry(),
    util        = require("./lib/util");

var EventEmitter = require("events").EventEmitter;
var events = new EventEmitter();

function Framework() {
    if(this.active) return;
    this.events = events;
}

Framework.prototype.app = function(name, options) {
    if(this.active) return this;
    this.name = name;
    this.active = true;
    this.options = options;
    return this;
};

Framework.prototype.register    = registry.register;
Framework.prototype.resolve     = registry.resolve;
Framework.prototype.load        = registry.get;

module.exports = new Framework();
