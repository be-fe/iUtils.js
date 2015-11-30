var locateUmdDefine = require('./locateUmdModule');


function isDefineNodeWithArgs (node) {
  return node && node.type === 'CallExpression' &&
         node.callee && node.callee.type === 'Identifier' &&
         node.callee.name === 'define';
};

function isRequireNodeWithArgs (node) {
  return node && node.type === 'CallExpression' &&
         node.callee && node.callee.type === 'Identifier' &&
         node.callee.name === 'require';
};




module.exports = function(ast, locateUmd){
  
  var topLevel = ast.program.body;
    
  return topLevel.map(function(node){
        
    if(isDefineNodeWithArgs(node.expression) || isRequireNodeWithArgs(node.expression)){
      return {
        isModule: true,
        rootAstNode: node,
        defineCall: node.expression
      }
    }else if(locateUmd){
      var defineCall = locateUmdDefine(node.expression);
      
      return {
        isModule: defineCall != null,
        rootAstNode: node,
        defineCall: defineCall
      }
    }else{
      return {
        isModule: false,
        rootAstNode: node,
        defineCall: null
      }
    }
    
  });
  
};