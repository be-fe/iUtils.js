/**
 * @file ajax.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return null
 * @params Object userOptions
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    var randomNumber = require('../random/randomNumber');
    var getType = require('../type/getType');

    var ajax = function (userOptions) {

        // 默认值
        var options = {
            // get, post,jsonp, file
            method: 'get',
            // url
            url: '',
            // key:value || string //当method为file的时候,params=formData, xmlHttpRequest 2.0 可利用formData对象来上传文件
            params: {},
            // text, json, xml
            type: 'text',
            // contentType
            contentType: null,
            // object: {name: value}
            header: null,
            success: function (data) {
            },
            fail: function () {
            }
        };

        var method;
        var url;
        var params;
        var type;
        var header;
        var contentType;
        var success;
        var fail;
        var xmlhttp;
        var formateParams;

        // 更新option
        for (var pro in userOptions) {
            if (userOptions[pro]) {
                options[pro] = userOptions[pro];
            }
        }

        // 简化变量
        method = options.method;
        url = options.url;
        params = options.params;
        type = options.type;
        // 跨域的话,服务端的 header 也要设置允许头才行.
        header = options.header;
        contentType = options.contentType;
        success = options.success;
        fail = options.fail;

        // xhr对象
        function createRequest() {

            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');// IE6以上版本
            }
            catch (e) {
                try {
                    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');// IE6以下版本
                }
                catch (e) {
                    try {
                        xmlhttp = new XMLHttpRequest();
                        if (xmlhttp.overrideMimeType) {
                            xmlhttp.overrideMimeType('text/xml');
                        }
                    }
                    catch (e) {
                        alert('您的浏览器不支持Ajax');
                    }
                }
            }
            return xmlhttp;

        }

        // 格式化参数
        function formateParameters(Params) {

            var paramsArray = [];
            var params = Params;
            for (var pro in params) {
                if (params.hasOwnProperty(pro)) {
                    var paramValue = params[pro];
                    if (method.toUpperCase() === 'GET') {
                        paramValue = encodeURIComponent(params[pro]);
                    }
                    paramsArray.push(pro + '=' + paramValue);
                }
            }
            return paramsArray.join('&');

        }


        // 获取返回值
        function readystatechange(xmlhttp) {
            var returnValue;
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200 || xmlhttp.status === 0) {

                    switch (type) {
                        case 'xml':
                            returnValue = xmlhttp.responseXML;
                            break;
                        case 'json':
                            var jsonText = xmlhttp.responseText;
                            if (jsonText) {
                                returnValue = eval('(' + jsonText + ')');
                            }
                            break;
                        default:
                            returnValue = xmlhttp.responseText;
                            break;
                    }

                    if (returnValue) {
                        if (success) {
                            success(returnValue);
                        }
                    }
                    else {
                        if (fail) {
                            fail();
                        }
                    }

                }
                else {
                    if (fail) {
                        fail();
                    }
                }
            }
        }

        // 创建XMLHttpRequest对象
        xmlhttp = createRequest();

        // 设置回调函数
        xmlhttp.onreadystatechange = function () {
            readystatechange(xmlhttp);
        };

        // 格式化参数,如果是对象,则进行格式化,字符串,则不进行格式化
        if (getType(params) === 'object') {
            formateParams = formateParameters(params);
        }
        else {
            formateParams = params;
        }


        // 类型判断
        if ('GET' === method.toUpperCase()) {

            // get 请求,可能自带问号,这里要做判断
            // 带有问号,这里要追加参数
            if (url.indexOf('?') > 0) {
                url += '&' + formateParams;
            }
            // 不带,这里要添加问号
            else {
                url += '?' + formateParams;
            }

            xmlhttp.open('get', url, true);

            if (header) {
                if (getType(header) === 'object') {
                    for (var x in header) {
                        if (header.hasOwnProperty(x)) {
                            xmlhttp.setRequestHeader(x, header[x]);
                        }
                    }
                }
            }

            xmlhttp.send(null);
        }
        else if ('POST' === method.toUpperCase()) {
            xmlhttp.open('post', url, true);
            // 如果是POST提交，设置请求头信息
            if (!contentType) {
                contentType = 'application/x-www-form-urlencoded';
            }
            xmlhttp.setRequestHeader('Content-Type', contentType);
            if (header) {
                if (getType(header) === 'object') {
                    for (var y in header) {
                        if (header.hasOwnProperty(y)) {
                            xmlhttp.setRequestHeader(y, header[y]);
                        }
                    }
                }
            }
            xmlhttp.send(formateParams);
        }
        else if ('JSONP' === method.toUpperCase()) {
            var callbackName = 'jsonp' + randomNumber(1000, 9999);

            // 创建script来请求jsonp
            var head = document.getElementsByTagName('head')[0] || document.documentElement;
            var script = document.createElement('script');
            url += '?' + formateParams;
            script.src = url + '&callback=' + callbackName;
            head.insertBefore(script, head.firstChild);

            script.onerror = fail();

            window[callbackName] = function (data) {
                if (success) {
                    success(data);
                }
                delete window[callbackName];
                head.removeChild(script);
            };

        }
        else if ('FILE' === method.toUpperCase()) {
            xmlhttp.open('post', url, true);
            if (header) {
                if (getType(header) === 'object') {
                    for (var h in header) {
                        if (header.hasOwnProperty(h)) {
                            xmlhttp.setRequestHeader(h, header[h]);
                        }
                    }
                }
            }
            // 此处params为formData对象
            xmlhttp.send(params);
        }

    }

    module.exports = ajax;

});
