/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var RegExpHelper = {
        isEmail : function (s) {
        var reg = /^\w+@[a-z0-9]+\.[a-z0-9]{2,4}$/; //注意要对行首和行尾做判断！

        if (reg.test(s)) {
            alert("正确");
        } else {
            alert("cuowu");
        }
    }
    }

    module.exports = RegExpHelper;


});
