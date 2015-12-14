/**
 * @file isChrome.js
 */
define(function (require, exports, module) {

    /**
     * @return Boolean
     */
    function isChrome() {

        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

        return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);

    }


    module.exports = isChrome;

});