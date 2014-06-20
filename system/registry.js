"use strict";

var path        = require("path"),
    fs          = require("fs"),
    existsSync  = fs.existsSync || path.existsSync;

exports.registry = function() {
    var factories, modules, register, registerSingle, convertToFactory, argumentList, notEmpty, container, load, loadfile, loaddir,
        get, haveVisited, resolve;
    factories   = {};
    modules     = {};

    /*
     * .register(name, func)
     *  Registers a dependency by name. func can be a function that takes
     *  dependencies and returns anything, or it can be an object that has no
     *  dependencies.
     *
     *  .register(hash)
     *  Registers a hash of names and dependencies. Pretty nice for config
     *  constants.
     */
    register = function(name, func) {
        var hash, _results;
        if(name === Object(name)) {
            //If the name passed in is an object
            //Set the hash variable to the name object
            hash = name;
            _results = [];

            for(name in hash) {
                func = hash[name];
                _results.push(registerSingle(name, func));
            }

            return _results;
        } else {
            //Otherwise it's just a normal call
            return registerSingle(name, func);
        }
    };

    /*
     *  Take a single function with a name and add it to the factories object
     */
    registerSingle = function(name, func) {
        if(func == null) {
            throw new Error("Can't register a function that's null");
        }
        return factories[name] = convertToFactory(func);
    };

    /*
     *  Load all functions from a file or folder.
     *  Registers a file using it's filename as the name or all files in a
     *  folder. This doesn't traverse subdirs though.
     */
    load = function(file) {
        var exists, status;
        exists = existsSync(file);
        if(exists) {
            stats = fs.statSync(file);
            if(stats.isDirectory()) {
                return loaddir(file);
            }
        }
        return loadfile(file);
    };

    loadfile = function(file) {
        var module, name;
        module = file.replace(/\.\w+$/, "");

        //Remove dashes from the file and convert it to camelcase
        name = path.basename(module).replace(/\-(\w)/g, function(match, letter) {
            return letter.toUpperCase();
        });

        return modules[name] = module;
    };

    /*
     *  Allow the loading of all files within a dir (and all of their component
     *  functions). Ensure that the only files used are of type js or
     *  coffeescript.
     */
    loaddir = function(dir) {
        var file, filenames, files, stats, _i, _len, _results;
        filenames = fs.readdirSync(dir);
        files = filenames.map(function(file) {
            return path.join(dir, file);
        });
        _results = [];
        for(_i = 0, _len = files.length; _i < _len; _i++) {
            file = files[_i];
            if(!file.match(/\.(js|coffee)$/)) {
                continue;
            }
            stats = fs.statSync(file);
            if(stats.isFile()) {
                _results.push(loadfile(file));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };

    /*
     * Form a factory from a function and also resolve it's argument list.
     */
    convertToFactory = function(func) {
        if(typeof func === "function") {
            return {
                func: func,
                required: argumentList(func)
            };
        } else {
            return {
                func: function() { return func; },
                required: []
            };
        }
    };

    /*
     *  Parse all the arguments required for the function passed in.
     */
    argumentList = function(func) {
        var match, required;
        //Alow a match over multiple lines because files won't just be 1 long
        //line
        match = func.toString().match(/function.*?\(([\s\S]*?)\)/);
        if(match == null) {
            throw new Error("Couldn't parse the function arguments : " + (func != null ? func.toString() : void 0));
        }
        required = match[1].split(",").filter(notEmpty).map(function(str) {
            return str.trim();
        });
        return required;
    };

    notEmpty = function(a) {
        return a;
    };

    /*
     *  Recursively resolves and returns a single dependency.
     *  Returns the dependency by name, with all dependencies injected. If
     *  overrides are specified then the dependency will be given those
     *  overrides instead of those registered.
     *  Usage: .get(name, overrides={})
     */
    get = function(name, overrides, visited) {
        var dependencies, factory, instance, isOverriden, module;
        if(visited == null) {
            visited = [];
        }
        isOverriden = overrides != null;

        //Check for circular dependencies
        if(haveVisited(visited, name)) {
            throw new Error("Circular dependency encountered: " + name);
        }
        visited = visited.concat(name);
        factory = factories[name];
        if(factory == null) {
            module = modules[name];
            if(module != null) {
                register(name, require(module));
                factory = factories[name];
            } else {
                throw new Error("Dependency not registered: " + name);
            }
        }

        //Use the factory we have already created
        if((factory.instance != null) && !isOverriden) {
            return factory.instance;
        }

        //Apply all arguments to the right
        dependencies = factory.required.map(function(name) {
            if((overrides != null ? overrides[name] : void 0) != null) {
                return overrides != null ? overrides[name] : void 0;
            } else {
                return get(name, overrides, visited);
            }
        });

        instance = factory.func.apply(factory, dependencies);
        if(!isOverriden) {
            factory.instance = instance;
        }
        return instance;
    };

    haveVisited = function(visited, name) {
        var isName;
        isName = function(n) { return n === name; };
        return visited.filter(isName).length;
    };

    /*
     *  Calls the passed in func like a dependency function, injecting any
     *  dependencies found in the signature. This method also supports
     *  overrides.
     *  Usage: .resolve(overrides={}, callback)
     */
    resolve = function(overrides, func) {
        if(!func) {
            func = overrides;
            overrides = null;
        }
        register("__temp", func);
        return get("__temp", overrides);
    };

    container = {
        register: register,
        get: get,
        resolve: resolve,
        load: load
    };

    container.register("_container", container);
    return container;
};
