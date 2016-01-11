/**
 * @file ajaxJsonp.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return null
 * @params String url, Object params, Function success, Function  fail
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    var ajaxJsonp = function (url, params, success, fail) {
        ajax({
            method: "jsonp",
            url: url,
            params: params,
            type: 'text',
            success: success,
            fail: fail
        });
    }

    module.exports = ajaxJsonp;


});