/**
 * @file getCookie.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @return String
 * @params String  name
 * @runtime Browser Window, Require JS
 * @dependencies none
 */
define(function (require, exports, module) {


    var getCookies = require('./getCookies');

    function getCookie(name) {
        return getCookies()[name];
    }

    module.exports = getCookie;

});