'use strict';

var util = require('util');
var request = require('request');
var eventService = require('../services/events.js');
var personService = require('../services/persons.js');

module.exports = {
  persons: persons
};

function persons(req, res) {
  personService.getListofIds(req.swagger.params.id.value, function(err, listofIds) {
    if (err) {
      res.send(err);
    };
    eventService.getEventsByPersonIds(listofIds, function(err, result) {
      if (err) {
        res.send(err);
      };
      var person = {};
      person.id = parseInt(req.swagger.params.id.value);
      person.events = result;
      res.json(person);
    })
  });
}