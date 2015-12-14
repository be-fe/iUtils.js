/**
 * @file width.js
 */

define(function (require, exports, module) {

    var getComputedStyles = require('./getComputedStyle');

    /**
     * @return Number
     * @param HTMLElement el
     */

    var width = function (el) {

        var styles = getComputedStyles(el);
        var width = parseFloat(styles.width.indexOf('px') !== -1 ? styles.width : 0);

        var boxSizing = styles.boxSizing || 'content-box';
        if (boxSizing === 'border-box') {
            return width;
        }

        var borderLeftWidth = parseFloat(styles.borderLeftWidth);
        var borderRightWidth = parseFloat(styles.borderRightWidth);
        var paddingLeft = parseFloat(styles.paddingLeft);
        var paddingRight = parseFloat(styles.paddingRight);
        return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;

    }

    module.exports = width;

});