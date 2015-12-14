/**
 * @file height.js
 */

define(function (require, exports, module) {

    var getComputedStyles = require('./getComputedStyle');

    /**
     * @return Number
     */

    var height = function (el) {

        const styles = getComputedStyles(el);
        const height = parseFloat(styles.height.indexOf('px') !== -1 ? styles.height : 0);

        const boxSizing = styles.boxSizing || 'content-box';
        if (boxSizing === 'border-box') {
            return height;
        }

        const borderTopWidth = parseFloat(styles.borderTopWidth);
        const borderBottomWidth = parseFloat(styles.borderBottomWidth);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);
        return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;

    }

    module.exports = height;

});