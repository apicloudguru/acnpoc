var should = require('should');
var request = require('supertest');
var server = require('../../../app');

process.env.A127_ENV = 'test';

describe('controllers', function() {

  describe('persons', function() {

    describe('GET /persons/{id}/events', function() {

      it('should return information based on given id', function(done) {

        request(server)
          .get('/persons/12345/events')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.personId.should.eql(12345);

            done();
          });
      });

      it('should accept a filter', function(done) {

        request(server)
          .get('/persons/12345/events')
          .query({ 
            role: 'victim',
            'date-before': '2016-01-01',
            'date-after': '2016-02-02',
            type: 'allegation'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.filter.should.eql('role=victim&date-before=2016-01-01&date-after=2016-02-02&type=allegation');

            done();
          });
      });

    });

  });

});
