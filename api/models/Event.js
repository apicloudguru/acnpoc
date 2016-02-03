var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var involed = new Schema({
	personId: { type: Number},
	role: { type: String}
});

var schema = new Schema({
		date: { type: Date, required: true},
		type: { type: String, required: true},
		status: { type: String, enum: ["Substantiated", "Unsubstatiated"]},
		eventDetails: { type: String },
		personsInvolved: [ Number ],
		roles: [ involed ]
});

module.exports = mongoose.model('Event', schema);


