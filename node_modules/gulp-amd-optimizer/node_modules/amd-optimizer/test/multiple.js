var fs = require('fs');
var optimize = require('../index.js');
var assert = require('assert');
var loadFile = require('./utils/loadFile');

describe("multiple file", function(done){
  
  var cwd = __dirname;
  var base = cwd + '/multiple';
  var output = ['dep', 'multiple'];
  
  before(function(done){
    var optimizer = optimize({
      baseUrl: base
    });

    optimizer.on('dependency', function(dependency){
      done('it should not fetch dependencies');
    });

    loadFile({path: base + '/multiple.js', name: 'multiple'}, base, cwd, function(file){
      optimizer.addFile(file);
      optimizer.done(function(optimized){
        output = optimized;

        done();
      });
    });
  });
  
  it("should have 2 items", function(){
    assert.equal(output.length, 2);
  });

  it("should have the dep first", function(){
    assert.equal(output[0].name, 'dep');
  });

  it("should have the multiple last", function(){
    assert.equal(output[1].name, 'multiple');
  });  
});