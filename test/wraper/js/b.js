// require js格式模块
//define({
//    color:'red'
//});

// require js 兼容 common js格式模块
define(function(require, exports, module) {

    console.log("这里是模块b");
    var a = require('a');

    module.exports = {
    color:'red'
    }

});