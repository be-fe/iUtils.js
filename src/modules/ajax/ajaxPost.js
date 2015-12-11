/**
 * Created by leiquan on 15/12/1.
 * @file ajaxPost
 * @author leiquan<leiquan@baidu.com>
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    var ajaxPost = function (url, params, type, contentType, successCallback, failCallback) {
        ajax({
            method: "post",
            url: url,
            params: params,
            type: type,
            contentType: contentType,
            successCallback: successCallback,
            failCallback: failCallback
        });
    }

    module.exports = ajaxPost;


});