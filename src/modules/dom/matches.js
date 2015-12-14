/**
 * @file matches.js
 */

define(function (require, exports, module) {

    /**
     * @return Boolean
     */

    var matches = function (el, selector) {
        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    }


    module.exports = matches;

});