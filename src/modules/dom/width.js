/**
 * @file width.js
 */

define(function (require, exports, module) {

    var getComputedStyles = require('./getComputedStyle');

    /**
     * @return
     */

    var width = function (el) {

        const styles = getComputedStyles(el);
        const width = parseFloat(styles.width.indexOf('px') !== -1 ? styles.width : 0);

        const boxSizing = styles.boxSizing || 'content-box';
        if (boxSizing === 'border-box') {
            return width;
        }

        const borderLeftWidth = parseFloat(styles.borderLeftWidth);
        const borderRightWidth = parseFloat(styles.borderRightWidth);
        const paddingLeft = parseFloat(styles.paddingLeft);
        const paddingRight = parseFloat(styles.paddingRight);
        return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;

    }

    module.exports = width;

});