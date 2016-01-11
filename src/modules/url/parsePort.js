/**
 * @file parsePort.js
 * @auther leiquan
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return String
 * @params String protocol
 * @runtime Browser Window, Require JS, Node.js

 */
define(function (require, exports, module) {

    var parsePort = function (protocol) {
        switch (protocol) {
            case 'http:':
                return 80;
            case 'https:':
                return 443;
            default:
                return location.port;
        }
    }

    module.exports = parsePort;


});