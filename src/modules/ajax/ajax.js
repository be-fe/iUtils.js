/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var randomNumber = require('../random/randomNumber');

    var myAjax = function (userOptions) {

        // 默认值
        var options = {
            method: "get", // get, post,jsonp, file
            url: "",
            params: {}, // key:value
            type: 'text', // text, json, xml
            formData: null, //xmlHttpRequest 2.0 可利用formData对象来上传文件
            successCallback: function (data) {
            },
            failCallback: function () {
            }
        };

        // 更新option
        for (var pro in userOptions) {
            options[pro] = userOptions[pro];
        }


        var method = options.method;
        var url = options.url;
        var params = options.params;
        var type = options.type;
        var formData = options.formData;
        var successCallback = options.successCallback;
        var failCallback = options.failCallback;


        // xhr对象
        var createRequest = function () {

            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");// IE6以上版本
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");// IE6以下版本
                } catch (e) {
                    try {
                        xmlhttp = new XMLHttpRequest();
                        if (xmlhttp.overrideMimeType) {
                            xmlhttp.overrideMimeType("text/xml");
                        }
                    } catch (e) {
                        alert("您的浏览器不支持Ajax");
                    }
                }
            }
            return xmlhttp;

        };

        // 格式化参数
        var formateParameters = function (params) {

            var paramsArray = [];
            var params = params;
            for (var pro in params) {
                var paramValue = params[pro];
                if (method.toUpperCase() === "GET") {
                    paramValue = encodeURIComponent(params[pro]);
                }
                paramsArray.push(pro + "=" + paramValue);
            }
            return paramsArray.join("&");

        };

        // 获取返回值
        var readystatechange = function (xmlhttp) {
            var returnValue;
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                switch (type) {
                    case "xml":
                        returnValue = xmlhttp.responseXML;
                        break;
                    case "json":
                        var jsonText = xmlhttp.responseText;
                        if (jsonText) {
                            returnValue = eval("(" + jsonText + ")");
                        }
                        break;
                    default:
                        returnValue = xmlhttp.responseText;
                        break;
                }

                if (returnValue) {
                    if (successCallback) {
                        successCallback(returnValue);
                    }
                } else {
                    if (failCallback) {
                        failCallback(returnValue);
                    }
                }

            }
        };

        // 创建XMLHttpRequest对象
        var xmlhttp = createRequest();

        // 设置回调函数
        xmlhttp.onreadystatechange = function () {
            readystatechange(xmlhttp);
        };

        // 格式化参数
        var formateParams = formateParameters(params);


        if ("GET" === method.toUpperCase()) {
            url += "?" + formateParams;
            xmlhttp.open(method, url, true);
            xmlhttp.send(null);
        } else if ("POST" === method.toUpperCase()) {

            xmlhttp.open(method, url, true);

            // 如果是POST提交，设置请求头信息
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send(formateParams);
        } else if ("JSONP" === method.toUpperCase()) {

            var callbackName = 'jsonp' + randomNumber(1000, 9999);

            // 创建script来请求jsonp
            var head = document.getElementsByTagName("head")[0] || document.documentElement;

            var script = document.createElement('script');

            url += "?" + formateParams;

            script.src = url + '&callback=' + callbackName;

            head.insertBefore(script, head.firstChild);

            window[callbackName] = function (data) {
                if (successCallback) {
                    successCallback(data);
                }
                delete window[callbackName];
                head.removeChild(script);
            }

        } else if ("FILE" === method.toUpperCase()) {
            xmlhttp.open("post", url, true);
            xmlhttp.send(formData);
        }


    }


    module.exports = myAjax;


});