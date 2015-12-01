/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var CSS = {
        hasClass: function (obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        addClass: function (obj, cls) {
            if (!CSS.hasClass(obj, cls)) {
                obj.className += ' ' + cls;
            }
        },

        removeClass: function (obj, cls) {
            if (CSS.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        },

        css: function (oDiv, sAttr, sValue) {
            if (arguments.length == 2) { //获取CSS样式，注意，style只能获取行间样式，这个需要注意，写在头部和写在外部的CSS央视没法获取到
                if (oDiv.currentStyle) { //IE currentStyle
                    return oDiv.currentStyle[sAttr];
                } else { //firefox getComputedStyle
                    return oDiv.getComputedStyle(oDiv, false)[sAttr];
                }
            } else if (arguments.length == 3) { //设置
                oDiv.style[sAttr] = sValue;
            }
        },

        getElementByClassName: function (node, classname) {
            if (node.getElementsByClassName) { // use native implementation if available
                return node.getElementsByClassName(classname);
            } else {
                return (function getElementsByClass(searchClass, node) {
                    if (node == null)
                        node = document;
                    var classElements = [],
                        els = node.getElementsByTagName("*"),
                        elsLen = els.length,
                        pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"),
                        i, j; //也可以用单词边界：只要两边是\b就可以了，说明这个单词是独立的

                    for (i = 0, j = 0; i < elsLen; i++) {
                        if (pattern.test(els[i].className)) {
                            classElements[j] = els[i];
                            j++;
                        }
                    }
                    return classElements;
                })(classname, node);
            }
        }
    };

    module.exports = CSS;


});
