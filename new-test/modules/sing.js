// require js格式模块
//define({
//    color:'red'
//});

// require js 兼容 common js格式模块
define(function(require, exports, module) {


    var say = require('say');

    var sing =function() {
        say();
        console.log('王鹤在唱歌');
    }

    module.exports = sing;

});