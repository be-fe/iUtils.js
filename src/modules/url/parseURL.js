define(function (require, exports, module) {

    var parsePort = require('./parsePort');

    var parseURL = function (url) {

        var a = document.createElement('a');
        a.href = url;

        return {
            href: a.href,
            host: a.host || location.host,
            port: ('0' === a.port || '' === a.port) ? parsePort(a.protocol) : a.port,
            hash: a.hash,
            hostname: a.hostname || location.hostname,
            pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
            protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
            search: a.search,
            query: a.search.slice(1)
        };

    }


    module.exports = parseURL;


});