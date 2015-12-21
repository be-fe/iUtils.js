/**
 * @file isIE.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/arasatasaygin/is.js
 * @api Function
 * @return Boolean
 * @params null,
 * @runtime Browser Window, Require JS
 * @dependencies none
 */
define(function (require, exports, module) {

    function isIE() {

        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';

        return /msie/i.test(userAgent) || "ActiveXObject" in window;

    }


    module.exports = isIE;

});