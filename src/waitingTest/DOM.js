/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var DOM = {

        insertAfter: function(newElement, targetElement){
            var parent = targetElement.parentNode;
            if (parent.lastChild == targetElement) {
                parent.appendChild(newElement);
            }
            else {
                parent.insertBefore(newElement, targetElement.nextSibling);
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

    module.exports = DOM;


});
