/**
 * @file serialize.js
 * @auther leiquan<leiquan@baidu.com>
 * @date 2015-12-1
 * @from https://github.com/be-fe/iToolkit/blob/master/src/pc/super_form.tag
 * @api Function
 * @return String
 * @params HTMLFormElement form,
 * @runtime Browser Window, Require JS
 * @dependencies none
 */
define(function (require, exports, module) {
    var getType = require('../type/GetType');


    function checkExistKey(obj, key, value) {
        if (obj.hasOwnProperty(key)) {
            if (getType(obj[key]) === 'array') {
                obj[key].push(value);
            }
            else {
                var arr = [];
                arr.push(obj[key]);
                arr.push(value)
                obj[key] = arr;
            }
        }
        else {
            obj[key] = value;
        }
    }

    function serializeObject(form) {

        var elems = form.elements;
        var params = {};
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].name) {
                var value;
                if (elems[i].tagName === 'SELECT') {
                    var options = elems[i].options;
                    for (var j = 0; j < options.length; j++) {
                        if (options[j].selected) {
                            value = options[j].value;
                            checkExistKey(params, elems[i].name, encodeURIComponent(value));
                        }
                    }
                }
                else if (elems[i].type === 'checkbox' || elems[i].type === 'radio') {
                    if (elems[i].checked) {
                        value = elems[i].value;
                        checkExistKey(params, elems[i].name, encodeURIComponent(value));
                    }
                }
                else {
                    value = elems[i].value;
                    checkExistKey(params, elems[i].name, encodeURIComponent(value));
                }
            }
        }
        return params;
    }


    module.exports = serializeObject;

});
