'use strict';

var util = require('util');
var request = require('request');
var eventService = require('../services/events.js');
var personService = require('../services/persons.js');

module.exports = {
  events: events
};

function events(req, res) {
  personService.getListofIds(req.swagger.params.id.value, function(err, listofIds) {
    if (err) {
      res.send(err);
    };
    eventService.getEventsByPersonIds(listofIds, function(err, result) {
      if (err) {
        res.send(err);
      };
      res.json(result);
    })
  });
}