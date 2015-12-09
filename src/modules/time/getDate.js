/**
 * @file getDate
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');
    var formatTime = require('./formatTime');
    var getDate = function (day, num, pattern) {
        num = num || 0;
        pattern = pattern || 'yyyyMMdd';

        return formatTime(parse(day) + 1000 * 60 * 60 * 24 * num, pattern);
    }

    module.exports = getDate;
});