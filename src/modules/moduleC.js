
var moduleA = require('./moduleA');
var moduleB = require('./moduleB')

var moduleC = function () {
    moduleA();
    moduleB();
    console.log("我是moduleC");
}

module.exports = moduleC;
