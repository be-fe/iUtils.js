/**
 * Created by leiquan on 15/12/1.
 */

define(function (require, exports, module) {

    var Math = {

        isRelative: function (iA, iB) {

            var flag = 0;

            var min = iA < iB ? iA : iB;
            var max = iA > iB ? iA : iB;

            for (var i = 2; i < (min + 1); i++) {
                if ((min % i == 0) & (max % i == 0)) {
                    flag++;
                }
            }

            if (flag > 0) {
                alert("不互质");
            } else {
                alert("互质");
            }

        }


    }

    module.exports = Math;


});