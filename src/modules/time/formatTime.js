/**
 * @file formatTime
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');

    var formatTime = function (day, pattern) {
        var source = new Date(parse(day));

        function replacer (patternPart, result) {
            pattern = pattern.replace(patternPart, result);
        }

        // 对目标数字进行0补齐处理
        var pad = function (source, length) {
            var pre = '';
            var negative = (source < 0);
            var string = String(Math.abs(source));

            if (string.length < length) {
                pre = (new Array(length - string.length + 1)).join('0');
            }

            return (negative ? '-' : '') + pre + string;
        };
        var year = source.getFullYear();
        var month = source.getMonth() + 1;
        var date2 = source.getDate();

        replacer(/yyyy/g, pad(year, 4));
        replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
        replacer(/MM/g, pad(month, 2));
        replacer(/M/g, month);
        replacer(/dd/g, pad(date2, 2));
        replacer(/d/g, date2);

        return pattern;
    }

    module.exports = formatTime;
});