/**
 * @file parse
 * @author lili<lili39@baidu.com>
 */

define(function (require, exports, module) {
    var DATE_PATTERN = /^(\d{4})\D*(\d{2})\D*(\d{2})/;
    var DATE_DAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    var parse = function (day) {
        var len = ('' + day).length;
        if (len <= 11 && DATE_PATTERN.test(day)) {
            var arr = ('' + day).match(DATE_PATTERN);
            return Date.parse(arr[2] + '/' + arr[3] + '/' + arr[1]);
        }
        else if (len >= 12) {
            return day;
        }
    }

    module.exports = parse;
});