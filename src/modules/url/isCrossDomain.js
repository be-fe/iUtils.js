/**
 * @file isCrossDomain.js
 * @auther leiquan
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return Bollean
 * @params String url
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */


define(function (require, exports, module) {

    var parseURL = require('./parseURL');

    // 是否跨域判断,判断主机名,端口号,和协议.
    var isCrossDomain = function (url) {

        url = parseURL(url);
        var location = parseURL(window.location.href);
        return url.hostname !== location.hostname
            || url.port !== location.port
            || url.protocol !== location.protocol;

    }

    module.exports = isCrossDomain;


});