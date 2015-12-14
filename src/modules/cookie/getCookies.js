/**
 * @file getCookies.js
 */
define(function (require, exports, module) {

    var parse = require('./parseCookie');

    /**
     * @return Object
     */
    function getCookies() {
        var str;
        try {
            str = document.cookie;
        } catch (err) {
            if (typeof console !== 'undefined' && typeof console.error === 'function') {
                console.error(err.stack || err);
            }
            return {};
        }
        return parse(str);
    }

    module.exports = getCookies;

});