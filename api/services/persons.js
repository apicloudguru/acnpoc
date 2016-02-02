var Person = require('../models/Person');

var createPerson = function (person, next) {
	var newPerson = new Person();

	newPerson.id = person.id;
	newPerson.firstName = person.firstName;
	newPerson.lastName = person.lastName;
	newPerson.DOB = person.DOB;
	newPerson.SSN = person.SNN;
	newPerson.gender = person.gender;
	newPerson.age = person.age;
    newPerson.relationships = person.relationships;

	newPerson.save(function(err) {
		if (err) {
			return next(err);
		};
		next(null, "Person Saved");
	});
}

var getPersonbyId = function(id, next) {

	Person.findOne({"id": id}, function(err, person) {
		if (err) {
			return next(err);
		}
		next(null, person);
	});
}

var getListofIds = function(id, next) {

	getPersonbyId(id, function(err, person) {
		if (err) {
			return next(err);
		}
		next(null, person.relationships.push(id));
	});
}

module.exports = {
	createPerson: createPerson,
	getPersonbyId: getPersonbyId,
	getListofIds: getListofIds
}