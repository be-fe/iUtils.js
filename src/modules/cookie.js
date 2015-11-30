define(function(require, exports, module) {

    var cookie =function () {

        this.setCookie = function (sName, value, iExpireDays) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + iExpireDays);
            document.cookie = sName + "=" + value + ";expires=" + oDate;
        }

        this.getCookie = function (sName) {
            var arr = document.cookie.split("; ");
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split("=");
                if (arr2[0] == sName) {
                    return arr2[1];
                }
            }
            return "";
        }

        this.removeCookie = function (sName) {
            this.setCookie(sName, "", -1);
        }

    }

    module.exports = new cookie();


});