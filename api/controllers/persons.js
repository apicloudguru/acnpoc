'use strict';

var util = require('util');
var request = require('request');
var personService = require('../services/persons.js');

module.exports = {
  persons: persons
};

function persons(req, res) {
  personService.getPersonbyId(req.swagger.params.id.value, function(err, result) {
    if (err) {
      res.send(err);
    };
    res.json(result);
  });
}