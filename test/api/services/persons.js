require('../../../api/models/Person');
var personService = require('../../../api/services/persons');
var should = require('should');
var async = require('async');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var Person = mongoose.model('Person');

before(function (done) {
    mongoose.connect('mongodb://localhost:27017/poc');
    //Create test users
    async.parallel([
            function(next){
                person1 = new Person({
                    id: 123,
	                firstName: "aaa",
	                lastName: "ccc",
	                DOB: "12/24/1990",
	                SSN: "453-23-2342",
	                age: 23,
	                gender: "Male",
	                relationships: [456]
                });
                person1.save(next);
            },
            function(next){
                person2 = new Person({
                	id: 456,
                	firstName: "bbb",
                	lastName: "ccc",
                	DOB: "12/24/1930",
                	SSN: "135-13-1341",
                	age: 60,
                	gender: "Female",
                	relationships: [123]
                });
                person2.save(next);
            },
            function(next){
                person3 = new Person({
                    id: 789,
	                firstName: "no",
	                lastName: "relationships",
	                DOB: "02/24/1990",
	                SSN: "540-22-1222",
	                age: 4,
	                gender: "Male"
                });
                person3.save(next);
            },
            function(next){
                person4 = new Person({
                    id: 77,
	                firstName: "ddd",
	                lastName: "yyy",
	                DOB: "10/31/2014",
	                SSN: "800-55-2331",
	                age: 4,
	                gender: "Female",
	                relationships: [98, 234, 634]
                });
                person4.save(next);
            },
            function(next){
                person5 = new Person({
                    id: 98,
	                firstName: "fff",
	                lastName: "yyyy",
	                DOB: "10/31/2015",
	                SSN: "800-55-2323",
	                age: 5,
	                gender: "Female",
	                relationships: [77, 234, 634]
                });
                person5.save(next);
            },
            function(next){
                person6 = new Person({
                    id: 234,
	                firstName: "ddd",
	                lastName: "yyy",
	                DOB: "10/31/2014",
	                SSN: "800-55-2331",
	                age: 4,
	                gender: "Female",
	                relationships: [98, 77]
                });
                person6.save(next);
            },
            function(next){
                Person7 = new Person({
                    id: 634,
	                firstName: "ttt",
	                lastName: "zzz",
	                DOB: "09/12/1974",
	                SSN: "800-55-2331",
	                age: 45,
	                gender: "Male",
	                relationships: [98, 77]
                });
                Person7.save(next);
            }
        ], function(err){
        	done();
    });
});

describe("Persons Service", function() {

	describe("Create Person", function () {
        it("should create person", function (done) { 
            person = {
                id: 341324,
                firstName: "aaa",
                lastName: "ccc",
                DOB: "12/24/1990",
                SNN: "453-23-2342",
                age: 23,
                gender: "Male",
                relationships: [978, 234, 634, 2434]
            }           
            personService.createPerson(person, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                Person.findOne({id: person.id}, function (err, user) {
                    should.exist(user);
                    user.firstName.should.equal(person.firstName);
                    done();
                });
            });
        });
    })

    describe("Find User By Id", function () {
        it("should get correct person", function (done) {
            personService.getPersonbyId(123, function(err, person) {
                should.not.exist(err);
                should.exist(person);
                done();
            });
        });
    })

    describe("Get Collection of ids", function() {

        it("Should return two ids", function (done) {
            personService.getListofIds(123, function (err, results) {
                should.not.exist(err);
                should.exist(results);
                results.length.should.equal(2);
                done();
            });
        })

        it("Should return one id", function (done) {
            personService.getListofIds(789, function (err, results) {
                should.not.exist(err);
                should.exist(results);
                results.length.should.equal(1);
                done();
            });
        })

        it("Should have relationship", function (done) {
            personService.getListofIds(77, function (err, results) {
                should.not.exist(err);
                should.exist(results);
                results.length.should.equal(4);
                results.indexOf(234).should.not.equal(-1);
                done();
            });
        })

        it("Should not have relationship", function (done) {
            personService.getListofIds(634, function (err, results) {
                should.not.exist(err);
                should.exist(results);
                results.length.should.equal(3);
                results.indexOf(234).should.equal(-1);
                done();
            });
        })
    })


})

