/**
 * @file ajaxFile.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return null
 * @params String url, FormData formData, Function success, Function  fail
 * @runtime Browser Window, Require JS
 * @dependencies none
 */


define(function (require, exports, module) {

    var ajax = require('./ajax');

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