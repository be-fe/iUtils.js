/**
 * @file getWeekArray
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');
    var getDate = require('./getDate');
    var getDayInWeek = require('./getDayInWeek');
    var betweenTime = require('./betweenTime');

    var getWeekArray: function (day1, day2) {

        day1 = getDate(day1, 0);
        day2 = getDate(day2, 0);

        var dy1 = getDayInWeek(day1);
        var k1 = dy1.k;

        var output = [];
        var start = 6 - k1;
        var max = betweenTime(day1, day2) + 1;
        var i = 1;
        var len = max - start;


        if (start > max) {
            return [day1 + '|' + day2];
        }


        output.push(day1 + '|' + getDate(day1, start));

        for (; i <= len; i += 7) {
            var startday = getDate(day1, start + i);
            var endday = getDate(day1, start + i + 6);

            if (startday > day2) {
                break;
            }

            if (endday > day2) {
                endday = day2;
            }

            output.push(startday + '|' + endday);
        }
        return output;
    }

    module.exports = getWeekArray;
});