/**
 * @file removeElement.js
 */

define(function (require, exports, module) {

    /**
     * @return null
     * @param HTMLElement el
     */

    var removeElement = function (el) {

        if (typeof el === 'string') {
            // it's an query string
            [].forEach.call(document.querySelectorAll(el), function (node) {
                node.parentNode.removeChild(node);
            });

        } else if (el.parentNode) {
            // it's an Element
            el.parentNode.removeChild(el);
        } else if (el instanceof NodeList) {
            // it's an array of elements
            [].forEach.call(el, function (node) {
                node.parentNode.removeChild(node);
            })
            ;
        } else {
            throw new Error('you can only pass Element, array of Elements or query string as argument');
        }

    }


    module.exports = removeElement;


});