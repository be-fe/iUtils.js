var assert = require('assert');
var optimize = require('../index.js');
describe("handle error", function(){


  before(function(done){
    var optimizer = optimize({
      baseUrl: '.'
    });
    
    optimizer.on('error', function(msg){
      done();
    });
    
    optimizer.error("oh noes");
  });

  it("it should emit the error", function(){
    assert.ok(true);
  });
});
