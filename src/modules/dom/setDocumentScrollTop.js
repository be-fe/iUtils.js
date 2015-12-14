/**
 * @file setDocumentScrollTop.js
 */

define(function (require, exports, module) {

    /**
     * @return Number
     * @param value
     */

    var setDocumentScrollTop = function (value) {
        window.scrollTo(0, value);
        return value;
    }


    module.exports = setDocumentScrollTop;


});