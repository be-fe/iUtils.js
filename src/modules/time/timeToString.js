/**
 * @file timeToString.js
 * @auther leiquan
 * @date 2015-12-22
 * @from self
 * @api Function
 * @return String
 * @params null | Date timeStamp , String dateSeparator, String timeSeparator
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */

define(function (require, exports, module) {

    var timeToString = function (timeStamp, dateSeparator, timeSeparator) {

        var mDate = timeStamp ? timeStamp : new Date();
        var mDateSeparator = dateSeparator ? dateSeparator : '-';
        var mTimeSeparator = timeSeparator ? timeSeparator : ':';

        var sYear = mDate.getFullYear();
        var sMonth = mDate.getMonth() + 1;
        var sDate = mDate.getDate();

        var sHour = mDate.getHours();
        var sMinute = mDate.getMinutes();
        var sSeconds = mDate.getSeconds();

        return sYear + mDateSeparator + sMonth + mDateSeparator + sDate + ' ' + sHour + mTimeSeparator + sMinute + mTimeSeparator + sSeconds;


    };

    module.exports = timeToString;


});
