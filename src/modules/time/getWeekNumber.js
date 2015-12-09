/**
 * @file getWeekNumber
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');

    var getWeekNumber = function (day1, day2) {
        var date1 = new Date(parse(day1));
        var date2 = new Date(parse(day2));
        var date0 = new Date(date1.getFullYear(), 0, 1);

        var d1 = Math.round((date1.getTime() - date0.getTime()
            + (date0.getDay() - date1.getDay()) * (24 * 60 * 60 * 1000)) / 86400000);
        var d2 = Math.round((date2.getTime() - date0.getTime()
            + (date0.getDay() - date2.getDay()) * (24 * 60 * 60 * 1000)) / 86400000);

        return Math.ceil(d2 / 7) - Math.ceil(d1 / 7);
    }

    module.exports = getWeekNumber;
});