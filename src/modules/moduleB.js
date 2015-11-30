/**
 * Created by leiquan on 15/11/30.
 */

// 由于在node平台,内层用export来实现

var moduleA = require('./moduleA');

var moduleB = function () {
    moduleA();
    console.log("我是moduleB");
}

module.exports = moduleB;


