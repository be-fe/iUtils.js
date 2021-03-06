/**
 * @file ajaxPost.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return null
 * @params String url, Object params, String type, String contentType,  Function success, Function  fail
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    var ajaxPost = function (url, params, type, contentType, header,success, fail) {
        ajax({
            method: "post",
            url: url,
            params: params,
            type: type,
            contentType: contentType,
            header: header,
            success: success,
            fail: fail
        });
    }

    module.exports = ajaxPost;


});