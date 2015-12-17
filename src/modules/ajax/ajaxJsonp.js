/**
 * Created by leiquan on 15/12/1.
 * @file ajaxJsonp.js
 * @author leiquan<leiquan@baidu.com>
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    /**
     * @params String url, Object params, Function success, Function  fail
     */
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