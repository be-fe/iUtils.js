/**
 * Created by leiquan on 15/12/1.
 * @file ajaxGet.js
 * @author leiquan<leiquan@baidu.com>
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    /**
     * @params String url, Object params, String type,  Function success, Function  fail
     */
    var ajaxGet = function (url, params, type, success, fail) {
        ajax({
            method: "get",
            url: url,
            params: params,
            type: type,
            success: success,
            fail: fail
        });
    }

    module.exports = ajaxGet;


});