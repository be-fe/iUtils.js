define(function (require, exports, module) {


    var say = require('say');

    var sing = function () {
        say();
        console.log('王鹤在唱歌');
    }

    module.exports = sing;

});