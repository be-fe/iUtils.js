/**
 * Created by leiquan on 15/12/1.
 * @file ajaxFile.js
 * @author leiquan<leiquan@baidu.com>
 */

define(function (require, exports, module) {

    var ajax = require('./ajax');

    /**
     * @params String url, FormData formData, Function success, Function  fail
     */
    // 注意,file对象要append到formData对象中,或者从form表单构造formdata,注意不要设置contenttype
    var ajaxFile = function (url, formData, success, fail) {
        ajax({
            method: "file",
            url: url,
            params: formData,
            type: 'text',
            success: success,
            fail: fail
        });
    }

    module.exports = ajaxFile;


});