/**
 * @file insertAfter.js
 */

define(function (require, exports, module) {

    /**
     * @return null
     * @param HTMLElement newEl, HTMLElement targetEl
     */

    var insertAfter = function (newEl, targetEl) {
        var parent = targetEl.parentNode;

        if (parent.lastChild === targetEl) {
            parent.appendChild(newEl);
        } else {
            parent.insertBefore(newEl, targetEl.nextSibling);
        }
    }


    module.exports = insertAfter;


});