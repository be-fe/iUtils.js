/**
 * @file getPosition.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/oneuijs/oui-dom-utils
 * @api Function
 * @return Object
 * @params HTMLElement el,
 * @runtime Browser Window, Require JS
 * @dependencies none
 */

define(function (require, exports, module) {

    var getPosition = function (el) {
        if (!el) {
            return {
                left: 0,
                top: 0
            };
        }

        return {
            left: el.offsetLeft,
            top: el.offsetTop
        };
    }

    module.exports = getPosition;

});