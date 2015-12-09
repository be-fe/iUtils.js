/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {


    var ajaxGet = function (sUrl, fnSucceed, fnFaild) {

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