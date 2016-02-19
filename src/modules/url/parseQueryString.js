/**
 * @file parseQueryString.js
 * @auther leiquan
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return Object
 * @param String str
 * @runtime Browser Window, Require JS, Node.js

 */

define(function (require, exports, module) {

    var trim = require('../string/trim');

    var pattern = /(\w+)\[(\d+)\]/;

    var encode = require('./encode');
    var decode = require('./decode');

    var parseQueryString = function (str) {
        if ('string' != typeof str) return {};

        str = trim(str);
        if ('' == str) return {};
        // if ('?' == str.charAt(0)) str = str.slice(1);
        var index = str.indexOf('?');
        if (index > -1) {
            str = str.substring(index + 1);
        }

        var obj = {};
        var pairs = str.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var parts = pairs[i].split('=');
            var key = decode(parts[0]);
            var m;

            if (m = pattern.exec(key)) {
                obj[m[1]] = obj[m[1]] || [];
                obj[m[1]][m[2]] = decode(parts[1]);
                continue;
            }

            obj[parts[0]] = null == parts[1]
                ? ''
                : decode(parts[1]);
        }

        return obj;
    };

    /*var parseQueryString = function (url) {
        if ('string' !== typeof url) {
            return {};
        };
        var pattern = /(\w+)=(\w+)/ig;
        var params = {};
        url.replace(pattern, function (a, b, c) {
            params[b] = c;
        });
        return params;
    };*/

    module.exports = parseQueryString;


});