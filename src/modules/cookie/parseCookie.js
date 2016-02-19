/**
 * @file parseCookie.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return Object
 * @params String  str
 * @runtime Browser Window, Require JS
 */

define(function (require, exports, module) {

    var decode = require('../url/decode');

    function parseCookie(str) {
        var obj = {};
        var pairs = str.split(/ *; */);
        var pair;
        if ('' == pairs[0]) return obj;
        for (var i = 0; i < pairs.length; ++i) {
            pair = pairs[i].split('=');
            obj[decode(pair[0])] = decode(pair[1]);
        }
        return obj;
    }


    module.exports = parseCookie;

});