/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var AJAX = {
        get: function (sUrl, fnSucceed, fnFaild) {
            //1.创建AJAX对象
            var oAjax = null;
            if (window.XMLHttpRequest) { //将XMLHttpRequest对象作为全局属性，不会报错
                oAjax = new XMLHttpRequest(); //IE6以上
            } else {
                oAjax = new ActiveXObject("Microsoft.XMLHTTP"); //IE6
            }
            //2.连接服务器
            //open参数：String 方法, String URL, Bollean 是否异步, String 用户名, String密码
            oAjax.open("GET", sUrl, true);
            //3.发送请求
            oAjax.send();
            //4.接受服务器的返回
            oAjax.onreadystatechange = function () {
                //readyState状态：0，1，2，3，4
                if (oAjax.readyState == 4) {
                    if (oAjax.status == 200 || oAjax.status == 0) { //200为成功，0为本地请求成功
                        fnSucceed(oAjax.responseText); //将返回值赋给成功函数
                        //alert(oAjax.responseText);
                    } else {
                        if (fnFaild) {
                            fnFaild();
                        }
                    }
                }
            }
        },
        post: function (sUrl, sPostData, fnSucceed, fnFaild) {
            var oAjax = null;
            if (window.XMLHttpRequest) {
                oAjax = new XMLHttpRequest();
            } else {
                oAjax = new ActiveXObject("Microsoft.XMLHTTP");
            }

            oAjax.open("POST", sUrl, true);
            oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            oAjax.send(sPostData)

            //4.接受服务器的返回
            oAjax.onreadystatechange = function () {
                //readyState状态：0，1，2，3，4
                if (oAjax.readyState == 4) {
                    if (oAjax.status == 200 || oAjax.status == 0) { //200为成功，0为本地请求成功
                        fnSucceed(oAjax.responseText); //将返回值赋给成功函数
                    } else {
                        if (fnFaild) {
                            fnFaild();
                        }
                    }
                }
            }
        }
    }

    module.exports = AJAX;


});