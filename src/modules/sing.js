define(function (require, exports, module) {


    var Say = require('Say');

    var Sing = function () {
        Say();
        console.log('王鹤在唱歌');
    }

    module.exports = Sing;

});