var Event = require('../models/Event');

var getEventsByPersonIds = function (ids, next) {
	
	Event.find({'involed.id': { $in: ids} }, function(err, events) {
		if (err) {
			return next(err);
		}
		next(null, events);
	});

}

var createEvent = function (event, next) {

	var newEvent = new Event();
	newEvent.date =  event.date;
	newEvent.type = event.type;
	newEvent.status = event.status;
	newEvent.eventDetails = event.eventDetails;
	newEvent.personsInvolved = event.personsInvolved;

	newEvent.save(function(err) {
		if (err) {
			return next(err);
		}

		next(null, "Event Created");
	});
	
}

module.exports = {
	getEventsByPersonIds: getEventsByPersonIds,
	createEvent: createEvent
}