/**
 * @file getCookies.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @return Object
 * @params null
 * @runtime Browser Window, Require JS
 * @dependencies none
 */
define(function (require, exports, module) {

    var parse = require('./parseCookie');

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