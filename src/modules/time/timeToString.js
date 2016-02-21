/**
 * @file timeToString.js
 * @auther leiquan
 * @date 2015-12-22
 * @from self
 * @api Function
 * @return String
 * @params null | Date timeStamp , String dateSeparator, String timeSeparator
 * @runtime Browser Window, Require JS, Node.js

 */

define(function (require, exports, module) {
    var formatStr = function (num) {
        return num < 10 ? '0' + num : num;
    };

    var timeToString = function (timeStamp, dateSeparator, timeSeparator) {
        var mDate = timeStamp ? new Date(timeStamp) : new Date();
        var mDateSeparator = dateSeparator || '-';
        var mTimeSeparator = timeSeparator || ':';
        var dateString = [mDate.getFullYear(), formatStr(mDate.getMonth() + 1), formatStr(mDate.getDate())];
        var timeString = [formatStr(mDate.getHours()), formatStr(mDate.getMinutes()), formatStr(mDate.getSeconds())];
        return dateString.join(mDateSeparator) + ' ' + timeString.join(mTimeSeparator);
    };

    module.exports = timeToString;


});
