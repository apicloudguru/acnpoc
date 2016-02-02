var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var involed = new Schema({
	_id: { type: String},
	role: { type: String}
});

var schema = new Schema({
		_id: { type: String, required: true },
		date: { type: Date, required: true},
		type: { type: String, required: true},
		status: { type: String, enum: ["Substantiated", "Unsubstatiated"]},
		eventDetails: { type: String },
		personsInvolved: [ involed ]
});

schema.index({ "personsInvolved._id": 1}, { unique: true });

module.exports = mongoose.model('Event', schema);

