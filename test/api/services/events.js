//var Event = require('../../../api/models/Event');
var eventsService = require('../../../api/services/events');
var should = require('should');
var async = require('async');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var Event = mongoose.model('Event');

before(function (done) {
	mongoose.connect('mongodb://localhost:27017/poc');

	//Create test events
    async.parallel([
            function(next){
                event1 = new Event({
                	date: "01/01/2015",
					type: "Neglect",
					status: "Substantiated",
					eventDetails: "http://",
					roles: [ 
						{ personId: 123, role: "victim"},
						{ personId: 456, role: "alleged"} 
					],
					personsInvolved: [123, 456]
                });
                event1.save(next);
            },
            function(next){
                event2 = new Event({
                	date: "01/01/2015",
					type: "Physical Abuse",
					status: "Unsubstatiated",
					eventDetails: "http://",
					roles: [ 
						{ personId: 123, role: "victim"},
						{ personId: 789, role: "alleged"} 
					],
					personsInvolved: [123, 789]
                });
                event2.save(next);
            },
            function(next){
                event3 = new Event({
                	date: "06/11/2015",
					type: "Physical Abuse",
					status: "Unsubstantiated",
					eventDetails: "http://",
					roles: [ 
						{ personId: 466, role: "alleged"},
						{ personId: 789, role: "alleged"},
						{ personId: 77, role: "victim"}
					],
					personsInvolved: [466, 789, 77]
                });
                event3.save(next);
            },
            function(next){
                event4 = new Event({
                	date: "09/23/2015",
					type: "Sexual Abuse",
					status: "Substantiated",
					eventDetails: "http://",
					roles
					: [ 
						{ personId: 466, role: "alleged"},
						{ personId: 555, role: "victim"},
						{ personId: 987, role: "victim"},
					],
					personsInvolved: [466, 555, 987]
                });
                event4.save(next);
            },
            function(next){
                event5 = new Event({
                	date: "11/01/2015",
					type: "Sexual Abuse",
					status: "Substantiated",
					eventDetails: "http://",
					roles: [ 
						{ personId: 77, role: "alleged"},
						{ personId: 222, role: "victim"},
						{ personId: 111, role: "victim"},
					],
					personsInvolved: [77, 222, 111]
                });
                event5.save(next);
            },
            function(next){
                event6 = new Event({
                	date: "11/09/2003",
					type: "Sexual Abuse",
					status: "Substantiated",
					eventDetails: "http://",
					roles: [ 
						{ personId: 4123, role: "alleged"},
						{ personId: 513, role: "victim"},
						{ personId: 413, role: "victim"},
					],
					personsInvolved: [4123, 513, 413]
                });
                event6.save(next);
            }
        ], function(err){
        	done();
    });
})

describe("Event Service", function() {

	describe("Create Event", function() {

		it("Should create an event", function (done) {
			event = {
				date: "11/01/2015",
				type: "Sexual Abuse",
				status: "Substantiated",
				eventDetails: "http://",
				roles: [ 
					{ personId: 90, role: "alleged"},
					{ personId: 91, role: "victim"}
				],
				personsInvolved: [90, 91]

			}
			eventsService.createEvent(event, function(err, results) {
				should.not.exist(err);
				should.exist(results);
				results.should.equal("Event Created");
				done();
			})
		})
	})

	describe("Find Events", function () {
		it("Should find two event by persons ids", function (done) {
			id = [ 123 ]
			eventsService.getEventsByPersonIds(id, function (err, events) {
				should.not.exist(err);
				should.exist(events);
				events.length.should.equal(2);
				done();
			})
		})
	})

	describe("Find Events", function () {
		it("Should find none event by persons ids", function (done) {
			id = [ 9898989 ]
			eventsService.getEventsByPersonIds(id, function (err, events) {
				should.not.exist(err);
				should.exist(events);
				events.length.should.equal(0);
				done();
			})
		})
	})
}) 