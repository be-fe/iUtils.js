
function getLiterals(arrayExpression){
  return arrayExpression.elements.filter(function(element){
    return element.type == 'Literal';
  }).map(function(element){
    return element.value;
  });
}


module.exports = function(defineCall){
  
  if(defineCall.type === 'CallExpression'){
    if(defineCall.arguments.length == 1){
      return [];
    }else if(defineCall.arguments.length == 2){
      if(defineCall.arguments[0].type == 'ArrayExpression'){
        return getLiterals(defineCall.arguments[0])
      }else if(defineCall.arguments[0].type == 'Literal'){
        return [];
      }
    }else if(defineCall.arguments.length == 3){
      if(defineCall.arguments[1].type == 'ArrayExpression'){
        return getLiterals(defineCall.arguments[1])
      } 
    }
  }else if(defineCall.type === 'Identifier'){
    return [];
  }else{
    throw "oops"
  }
};