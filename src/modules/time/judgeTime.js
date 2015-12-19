/**
 * @file judgeTime.js
 * @auther xieyu33333
 * @date 2015-12-1
 * @from self
 * @return obj
 * @params string/number/obj
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */

define(function (require, exports, module) {

    var parseTime = require('./parseTime');

    var _getTimeStr = function (time) {
        var time = new Date(time);
        var Y = (time.getFullYear() + '-');
        var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
        var D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
        var h = time.getHours() + ':';
        var m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        return {
            dateStr: Y + M + D,
            timeStr: h + m,
            dateTimeStr: Y + M + D + ' ' + h + m
        }
    }

    var judgeTime = function (time) {
        var timeType;
        var dateStr;
        var timeStr;
        var timeStamp = parseTime(time);
        var now = new Date().getTime();
        var Y = time.getFullYear();
        var y = now.getFullYear();
        var m = now.getMonth();
        var d = now.getDate();
        var zeroStamp = Math.round(new Date(y, m, d, 0, 0, 1).getTime()); //获得今日0点的时间戳
        var nz = now - zeroStamp;
        var nt = now - timeStamp;
        if (nt < nz) {
            timeType = 'today';
        }
        else if (nt > nz && nt < (86400000 + nz)) {
            timeType = 'yesterday';
        }
        else if (y - Y === 1) {
            timeType = 'lastYear';
        }
        else if (y - Y === 0) {
            timeType = 'thisYear';
        }
        //添加更多支持：例如上个月，去年，今年
        else {
            timeType = 'normal';
        }

        var timeStrObj = _getTimeStr(time);

        return {
            timeStamp: timeStamp,
            dateStr: timeStrObj.dateStr,
            timeStr: timeStrObj.timeStr,
            dateTimeStr: timeStrObj.dateTimeStr,
            timeType: timeType
        }
    }

    module.exports = judgeTime;


});