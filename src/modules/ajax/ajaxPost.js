/**
 * Created by leiquan on 15/12/1.
 * @file ajaxPost.js
 * @author leiquan<leiquan@baidu.com>
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    /**
     * @params String url, Object params, String type, String contentType,  Function success, Function  fail
     */
    var ajaxPost = function (url, params, type, contentType, success, fail) {
        ajax({
            method: "post",
            url: url,
            params: params,
            type: type,
            contentType: contentType,
            success: success,
            fail: fail
        });
    }

    module.exports = ajaxPost;


});