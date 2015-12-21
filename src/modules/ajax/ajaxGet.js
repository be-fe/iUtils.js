/**
 * @file ajaxGet.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return null
 * @params String url, Object params, String type,  Function success, Function  fail
 * @runtime Browser Window, Require JS
 * @dependencies none
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

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