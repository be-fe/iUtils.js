/**
 * @file getDayArray
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var parse = require('./parse');
    var getDate = require('./getDate');
    var betweenTime = require('./betweenTime');

    var getDayArray: function (day1, day2, n, pattern) {
        pattern = pattern || 'yyyyMMdd';

        var all = betweenTime(day1, day2);

        if (all <= n) {
            n = all;
        }

        var arr = [];
        var cur = 0;
        var i = 0;
        var step = (n > 1) ? (n - 1) : all;
        var part = Math.floor(all / step);
        var residue = all % n; // 记录差值

        arr.push(getDate(day1, 0, pattern));

        for (; i < step; i++) {
            cur += part;
            cur += (residue-- > 0) ? 1 : 0;
            arr.push(getDate(day1, cur, pattern));
        }

        return arr;
    }

    module.exports = getDayArray;
});