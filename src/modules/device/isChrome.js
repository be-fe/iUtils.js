/**
 * @file isChrome.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/arasatasaygin/is.js
 * @api Function
 * @return Boolean
 * @params null,
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    function isChrome() {

        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

        return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);

    }


    module.exports = isChrome;

});