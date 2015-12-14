/**
 * @file getDocumentScrollTop.js
 */

define(function (require, exports, module) {

    /**
     * @return Number
     */

    var getDocumentScrollTop = function () {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    }


    module.exports = getDocumentScrollTop;


});