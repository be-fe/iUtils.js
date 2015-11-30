var typeBuilders = require('recast').types.builders;
var recast = require('recast');

module.exports = function(source, name){
  return recast.print(
    typeBuilders.program(source),
    {
      sourceMapName: name+'.js'
    }
  );
};