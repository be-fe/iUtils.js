/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {


    var DateHelper = {

        DateDiff: function (sDate1, sDate2) {    //sDate1和sDate2是2002-12-18格式

            var aDate, oDate1, oDate2, iDays;

            aDate = sDate1.split("-");
            oDate1 = new Date(aDate[0], aDate[1], aDate[2]);//转换为12-18-2002格式
            aDate = sDate2.split("-");
            oDate2 = new Date(aDate[0], aDate[1], aDate[2]);

            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);//把相差的毫秒数转换为天数
            return iDays + 1;
        },

        getLocalDate: function (now) {
            var num = parseInt(now);
            // console.log('num:'+num);
            var now = new Date(num);
            var month = now.getMonth() + 1;
            var date = now.getDate();
            if (month === (new Date().getMonth() + 1)) {
                if (date == (new Date().getDate())) {
                    return '今天';
                } else if (date == (new Date().getDate() - 1)) {
                    return '昨天';
                } else {
                    return month + "月" + date + '日';
                }
            } else {
                return month + "月" + date + '日';
            }

        },

        secondToTimeText: function (second) {

            var time = '';
            if (second > 3600) {
                //这里到小时的转换
                if ((second % 3600) > 60) {
                    //小时,分钟,秒
                    time = (parseInt(second / 3600, 10)) + '时' + parseInt((second % 3600) / 60, 10) + '分' + (second % 3600) % 60 + '秒';
                } else {
                    //小时,直接到秒
                    time = (parseInt(second / 3600, 10)) + '时' + (second % 3600) + '秒';
                }
            } else if (second > 60) {
                //这里是分钟的转换
                time = parseInt(second / 60, 10) + '分' + second % 60 + '秒';
            }
            return time;
        },

    }


    module.exports = DateHelper;


});