/**
 * @file getMonthArray
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');

    var getMonthArray: function (day1, day2) {
        var date1 = new Date(parse(day1));
        var date2 = new Date(parse(day2));

        if (date1 > date2) {
            var date = date1;
            date1 = date2;
            date2 = date;
        }

        var year1 = date1.getFullYear();
        var year2 = date2.getFullYear();
        var month1 = date1.getMonth() + 1;
        var month2 = date2.getMonth() + 1;
        var arr = [];
        var i = year1;
        var j = month1;
        var jj = (year2 - year1) * 12 + month2;

        for (; i <= year2; i++) {
            for (; j <= jj; j++) {
                arr.push(i + '' + ((j > 9) ? j : '0' + j));

                if (j === 12) {
                    j = 1;
                    jj -= 12;
                    break;
                }
            }
        }
        return arr;
    }

    module.exports = getMonthArray;
});