// require js格式模块
//define({
//    color:'red'
//});

// require js 兼容 common js格式模块
define(function(require, exports, module) {

    console.log("这里是模块b,依赖了模块a");
    var a = require('a');

    module.exports = {
    color:'这里是b的颜色'
    }

});