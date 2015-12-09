/**
 * @file getYearArray
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');

    var getYearArray: function (day1, day2) {
        var year1 = new Date(parse(day1)).getFullYear();
        var year2 = new Date(parse(day2)).getFullYear();
        var arr = [];
        var i = year1;

        if (year1 > year2) {
            i = year2;
            year2 = year1;
        }

        for (; i <= year2; i++) {
            arr.push(i);
        }

        return arr;
    }

    module.exports = getYearArray;
});