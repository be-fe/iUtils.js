/*
 * from https://github.com/component/ie/blob/master/index.js
 */
define(function (require, exports, module) {

    function isIE() {

        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';

        is.ie = function (version) {
            if (!version) {
                return /msie/i.test(userAgent) || "ActiveXObject" in window;
            }
            if (version >= 11) {
                return "ActiveXObject" in window;
            }
            return new RegExp('msie ' + version).test(userAgent);
        };
    }


    module.exports = isIE;

});