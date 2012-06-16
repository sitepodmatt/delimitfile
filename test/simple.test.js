var path = require('path');
var fs = require('fs');
var assert = require('assert');

describe("delimit file reading", function() {

  it("should read three lines from example file", function(done) {

    var exampleFile = path.resolve('.', 'test','random.txt');
    var expectedLines = ['aaa bbb ccc','ddd eee fff','ggg hhh iii'];

    var delimitFile = require('../index')(exampleFile,'\n');

      delimitFile.on('data', function(data) {
        assert.equal(expectedLines.splice(0,1),data, 'lines match');
        if(expectedLines.length === 0) done();
      });
  });

  it("word delimiter - should read three parts from example file", function(done) {

    var exampleFile = path.resolve('.', 'test','random-word.txt');
    var expectedLines = ['aaa bbb ccc','ddd eee fff','ggg hhh iii'];

    var delimitFile = require('../index')(exampleFile,'|||');

      delimitFile.on('data', function(data) {
        var expected = expectedLines.splice(0,1);
        var actual = data.trim();
        /* console.log(':' + expected + ':' + data + ':'); */
        assert.equal(expected, data, 'lines not match');
        if(expectedLines.length === 0) done();
      });
  });

  it("should pass underlying errors back up", function(done) {

    var delimitFile = require('../index')("not-existing-file", '\n');

      delimitFile.on('error', function(error) {
        done();
      });
  });
});
