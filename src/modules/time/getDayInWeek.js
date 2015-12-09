/**
 * @file getDateInWeek
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');
    var startDay = 1;
    var DATE_DAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    var getDayInWeek: function (day) {
        var index = new Date(parse(day)).getDay();

        var k = (startDay === 1)
            ? (index === 0) ? 6 : index - 1
            : index;

        return {
            k: k,
            v: DATE_DAYS[index]
        };
    }

    module.exports = getDateInWeek;
});