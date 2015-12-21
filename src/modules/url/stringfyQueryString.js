/**
 * @file stringfyQueryString.js
 * @auther leiquan
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return String
 * @param Object obj
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */
define(function (require, exports, module) {


    var trim = require('../string/trim');
    var getType = require('../type/getType');

    var encode = require('./encode');
    var decode = require('./decode');

    var stringfyQueryString = function (obj) {
        if (!obj) return '';
        var pairs = [];

        for (var key in obj) {
            var value = obj[key];

            if ('array' == getType(value)) {
                for (var i = 0; i < value.length; ++i) {
                    pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
                }
                continue;
            }

            pairs.push(encode(key) + '=' + encode(obj[key]));
        }

        return pairs.join('&');
    };

    module.exports = stringfyQueryString;


});