;(function() {
/**
 * @file parsePort.js
 * @auther leiquan
 * @date 2015-12-1
 * @from self
 * @api Function
 * @return String
 * @params String protocol
 * @runtime Browser Window, Require JS, Node.js
 * @dependencies none
 */
var url_parsePort = {}, url_parseURL = {};
url_parsePort = function (exports) {
  var parsePort = function (protocol) {
    switch (protocol) {
    case 'http:':
      return 80;
    case 'https:':
      return 443;
    default:
      return location.port;
    }
  };
  exports = parsePort;
  return exports;
}(url_parsePort);
url_parseURL = function (exports) {
  var parsePort = url_parsePort;
  var parseURL = function (url) {
    var a = document.createElement('a');
    a.href = url;
    return {
      href: a.href,
      host: a.host || location.host,
      port: '0' === a.port || '' === a.port ? parsePort(a.protocol) : a.port,
      hash: a.hash,
      hostname: a.hostname || location.hostname,
      pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
      protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
      search: a.search,
      query: a.search.slice(1)
    };
  };
  exports = parseURL;
  return exports;
}(url_parseURL);
}());