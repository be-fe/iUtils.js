/*
 * from https://github.com/component/ie/blob/master/index.js
 */
define(function (require, exports, module) {

    function isChrome() {

        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

        console.log(appVersion);


        return /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor);

    }


    module.exports = isChrome;

});