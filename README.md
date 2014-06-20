Because this isn't really a proper project I'm just going to use this readme to
list my todo list.

Achieved in the first 5 hours:
* ~~Obtain beer~~
* ~~Improve Route Bootstrapping so that routes don't have to be defined~~ _Done
  to a basic degree so far_
* ~~Improve the way controller files are layed out. Preferably encapsultion in an
  object literal with defined functions for each route. Possible use of conflate
  during the bootstrapping process to load the file methods and attributes in a
  prototype?~~ - _realised that prototype'd methods don't fit in with the design
  I have in mind_
* ~~Write model code such that they act the same way as controllers~~ -
  _#mongoose_
* ~~Expand the usage of the framework's registry so that scripts within the
  framework can use it natively.~~ - _Used global object, nasty, nasty, nasty_
  sounds amusing.

Stil to do:
* Work in some form of View system and rendering system and hook that into
  express.
* Bring in Grunt and possibly Bower to make the CLI side of things nicer
* Unit Tests
* Might write a simple NewRelic clone directly into the framework because that
