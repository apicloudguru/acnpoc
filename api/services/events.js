var models = require('../models');

var getEventsByPersonIds = function (ids, next) {
	
	models.Event.find({involed.id: ids}, function(err, events) {
		if (err) {
			return next(err);
		}
		next(null, events);
	});

}

var createEvent = function (event, next) {

	var newEvent = new Models.Event();

	newEvent = event;

	event.save(function(err) {
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