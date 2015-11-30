var traverse = require('ast-traverse');

module.exports = function(astExpression){
  
  var hasBeenFound = false;
  var defineCall = null;
  
  traverse(astExpression, {
    pre: function(node, parent, prop, idx){
      var result = findDefine(node);
      if(result){
        hasBeenFound = true;
        defineCall = result;
      }
    },
    skipProperty: function(){
      return hasBeenFound;
    }
  });
  
  
  return defineCall;
};

function findDefine(node){
  return isIfDefineAndAmd(node)
      || isConditionalDefineAndAmd(node);
}

//if(<isUmdTest>){<containsDefineStatement>}
function isIfDefineAndAmd(node){
  return node && node.type === 'IfStatement'
      && isUmdTest(node.test)
      && containsDefineStatement(node.consequent);
}

//<isUmdTest> ? define
function isConditionalDefineAndAmd(node){
  return node && node.type === 'ConditionalExpression'
      && isUmdTest(node.test)
      && (node.consequent.type === 'Identifier'
      && node.consequent.name === 'define'
      && (node.consequent.parent = node, node.consequent)
      || isDefineNodeWithArgs(node.consequent));
}

//<isTypeofFunction> && <isDefineAmd>
function isUmdTest(expression){
  return expression && expression.type === 'LogicalExpression'
      && expression.operator === '&&'
      && (isTypeofFunction(expression.left)
      || isSecondLevelUmdTest(expression.left)
      ) && isDefineAmd(expression.right);
}

function isSecondLevelUmdTest(expression){
  return expression && expression.type === 'LogicalExpression'
      && expression.operator === '&&'
      && isTypeofFunction(expression.left);
}

//typeof define === 'function'
function isTypeofFunction(expression){
  return expression && expression.type === 'BinaryExpression'
      && expression.operator === '==='
      && expression.left.type === 'UnaryExpression'
      && expression.left.argument
      && expression.left.argument.type === 'Identifier'
      && expression.left.argument.name === 'define'
      && expression.right.type === 'Literal'
      && expression.right.value === 'function';
}

//define.amd
//define['amd']
function isDefineAmd(expression){
  return expression && expression.type === 'MemberExpression'
      && expression.object && expression.object.type === 'Identifier'
      && expression.object.name === 'define'
      && expression.property
      && (expression.property.type === 'Identifier' && expression.property.name === 'amd'
      || expression.property.type === 'Literal' && expression.property.value === 'amd' );
}

//{<isDefineStatement>}
function containsDefineStatement(statement){
  return statement && statement.type === 'BlockStatement'
      && first(statement.body, isDefineStatement);
}

//define(...)
function isDefineStatement(statement){
  return statement && statement.type === 'ExpressionStatement'
      && statement.expression
      && isDefineNodeWithArgs(statement.expression);
}

//define(...)
function isDefineNodeWithArgs (node) {
  return node && node.type === 'CallExpression'
      && node.callee && node.callee.type === 'Identifier'
      && node.callee.name === 'define' && node;
}

function first(array, func){
  for(var i=0; i<array.length; i++){
    var result = func(array[i]);
    if(result) return result;
  }
  return null;
}