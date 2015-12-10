/**
 * Created by leiquan on 15/12/1.
 * @file ajaxGet
 * @author leiquan<leiquan@baidu.com>
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    var ajaxGet = function (url, params,type,  successCallback, failCallback) {
        ajax({
            method: "get",
            url: url,
            params: params,
            type: type,
            successCallback: successCallback,
            failCallback: failCallback
            });
    }

    module.exports = ajaxGet;


});