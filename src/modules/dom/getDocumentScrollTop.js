/**
 * @file getDocumentScrollTop.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @return Number
 * @params null
 * @runtime Browser Window, Require JS
 * @dependencies none
 */


define(function (require, exports, module) {

    var getDocumentScrollTop = function () {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    }


    module.exports = getDocumentScrollTop;


});