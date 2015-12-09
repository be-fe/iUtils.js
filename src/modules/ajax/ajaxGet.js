/**
 * Created by leiquan on 15/12/1.
 */

// 单独的get方法,方便快速使用
define(function (require, exports, module) {


    var parseJsonToQuery = require('./parseJsonToQuery');

    var ajaxGet = function (sUrl, oQueryData, fnSucceed, fnFaild) {

        // 有数据才解析数据,对应的是无数据,可能只需要请求一个固定url
        if (oQueryData) {
            sUrl = sUrl + '?' +parseJsonToQuery(oQueryData);
        }

        var oAjax = null;
        if (window.XMLHttpRequest) {
            oAjax = new XMLHttpRequest(); //IE6以上
        } else {
            oAjax = new ActiveXObject("Microsoft.XMLHTTP"); //IE6
        }


        oAjax.open("GET", sUrl, true);

        oAjax.send();

        oAjax.onreadystatechange = function () {

            if (oAjax.readyState == 4) {
                if (oAjax.status == 200 || oAjax.status == 0) {
                    fnSucceed(oAjax.responseText);
                } else {
                    if (fnFaild) {
                        fnFaild();
                    }
                }
            }
        }
    };


    module.exports = ajaxGet;


});