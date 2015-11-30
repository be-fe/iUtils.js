/**
 * Created by leiquan on 15/11/30.
 */

var submit = document.querySelector('#submit');

var modules = document.querySelectorAll('#modules li input');

submit.onclick = function () {

    var arr = [];
    for (var i = 0; i < modules.length; i++) {
        arr.push(modules[i].id);
    }

    window.location.href = "/build?module=" + arr.join(',');

}
