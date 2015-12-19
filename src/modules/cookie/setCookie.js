/**
 * @file setCookie.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @return Object
 * @params String  name, String  value, Object  options,
 * @runtime Browser Window, Require JS
 * @dependencies none
 */

define(function (require, exports, module) {

    var encode = require('../url/encode');

    function setCookie(name, value, options) {
        options = options || {};
        var str = encode(name) + '=' + encode(value);

        if (null == value) options.maxage = -1;

        if (options.maxage) {
            options.expires = new Date(+new Date + options.maxage);
        }

        if (options.path) str += '; path=' + options.path;
        if (options.domain) str += '; domain=' + options.domain;
        if (options.expires) str += '; expires=' + options.expires.toUTCString();
        if (options.secure) str += '; secure';

        document.cookie = str;
    }

    module.exports = setCookie;

});