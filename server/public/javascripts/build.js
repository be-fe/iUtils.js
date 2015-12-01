/**
 * Created by leiquan on 15/11/30.
 */
console.log(document.cookie);
var getCookie = function (sName) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == sName) {
            return arr2[1];
        }
    }
    return "";
}

var string = "?string=" +  getCookie('string');

var back = document.getElementById('back');
back.style.display = 'none';

back.onclick = function () {
    window.location.href = '/';
};

setTimeout(function(){
    window.location.href = '/download' + string;
    back.style.display = 'block';


},3000);
