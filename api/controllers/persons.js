'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var request = require('request');
//var Event = require('../models/event.js');
/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  persons: persons
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function persons(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var person = {};
  person.personId = parseInt(req.swagger.params.id.value);
  person.filter = req.url.split('?')[1];
  // Using mock data for event model
  person.relationships = [];
  person.relationships.push(9876);
  person.relationships.push(1111);
  person.events = [];
  var personsInvolved = [];
  personsInvolved.push({
    'id:' : person.personId,
    'name' : 'Jose Garcia',
    'role' : 'victim',
    'relationship' : 'self'
  });
  personsInvolved.push({
    'id' : 37167,
    'name' : 'Raul Garcia',
    'role' : 'alleged',
    'relationship' : 'father'
  });
  person.events.push({
    'eventId' : 9876,
    'date' : '2007-01-21',
    'type' : 'allegation',
    'status' : 'substantiated',
    'eventDetails' : '/events/9876',
    'personsInvolved' : personsInvolved
  });
  person.events.push({
    'eventId' : 9877,
    'date' : '2007-01-22',
    'type' : 'allegation',
    'status' : 'unsubstantiated',
    'eventDetails' : '/events/9877',
    'personsInvolved' : personsInvolved
  });

  // testing querying for later
  /*
  Event.
    find({}).
    where('personsInvolved[*].role').equals(req.swagger.params.role.value).
    where('date').gt(req.swagger.params[date-before].value).lt(req.swagger.params[date-after].value).
    where('type').equals(req.swagger.params.type.value).
    exec(callback);
  */

  res.json(person);
  // this sends back a JSON response which is a single string
}