define(function (require, exports, module) {

    var Array = {
            remove: function (arr, dx) {

                if (isNaN(dx) || dx > this.length) {
                    return false;
                }
                arr.splice(dx, 1);
            },

            orderByMin: function (aArray) {
                aArray.sort(function (num1, num2) {
                    return num1 - num2;
                });
            },

            oderByMax: function (aArray) {
                aArray.sort(function (num1, num2) {
                    return num2 - num1;
                });
            }

        }

    module.exports = Array;


});