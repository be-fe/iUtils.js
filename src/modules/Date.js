/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var DateDiff = function (sDate1, sDate2) {    //sDate1和sDate2是2002-12-18格式

        var aDate, oDate1, oDate2, iDays;

        aDate = sDate1.split("-");
        oDate1 = new Date(aDate[0], aDate[1], aDate[2]);//转换为12-18-2002格式
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[0], aDate[1], aDate[2]);

        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);//把相差的毫秒数转换为天数
        return iDays + 1;
    }

    module.exports = DateDiff;


});