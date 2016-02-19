/**
 * @file serialize.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/be-fe/iToolkit/blob/master/src/pc/super_form.tag
 * @api Function
 * @return String
 * @params HTMLFormElement form,
 * @runtime Browser Window, Require JS

 */
define(function (require, exports, module) {

    function serializeArray(form) {

        var elems = form.elements;
        var arr = [];
        for (var i = 0; i < elems.length; i++) {

            if (elems[i].name && elems[i].type !== 'file' && !elems.disable) {

                if (elems[i].tagName === 'SELECT') {
                    var options = elems[i].options;
                    for (var j = 0; j < options.length; j++) {
                        if (options[j].selected) {
                            arr.push({name: elems[i].name, value: options[j].value});
                        }
                    }
                }
                else if (elems[i].type === 'checkbox' || elems[i].type === 'radio') {
                    if (elems[i].checked) {
                        arr.push({name: elems[i].name, value: elems[i].value});
                    }
                }
                else {
                    arr.push({name: elems[i].name, value: elems[i].value});
                }
            }

        }

        return arr;
    }


    module.exports = serializeArray;

});
