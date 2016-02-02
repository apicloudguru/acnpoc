var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	id: { type: Number, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	DOB: { type: Date, required: true},
	SSN: { type: String, required: true},
	gender: { type: String, required: true, enum: ["Male", "Female"]},
	age: { type: Number},
    relationships: [ { type: String } ]
});

module.exports = mongoose.model('Person', schema);