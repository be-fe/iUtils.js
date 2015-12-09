/**
 * @file betweenTime
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');

    var betweenTime = function (day1, day2) {
        return Math.abs((parse(day1) - parse(day2)) / 86400000);
    };

    module.exports = betweenTime;
});