/**
 * @file parsePort.js
 */

define(function (require, exports, module) {

    /**
     * @return String
     * @params String protocol
     */
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