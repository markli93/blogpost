var request = require('supertest');
var index = require('../index');

describe('it should return array of object', function(){
    it('Get route',function(done){
       request(index).get("/api/posts?tag=tech&sortBy=likes&direction=asc").expect(200).end(done)
    })
})