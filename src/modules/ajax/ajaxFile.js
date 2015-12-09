/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    // 注意,file对象要append到formData对象中
    var ajaxFile = function (url, formData, successCallback, failCallback) {
        ajax({
            method: "post",
            url: url,
            formData: formData,
            type: 'text',
            successCallback: successCallback,
            failCallback: failCallback
        });
    }

    module.exports = ajaxFile;


});