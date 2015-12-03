(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/**
 * Created by leiquan on 15/12/1.
 */
var AJAX = {};
AJAX = function (exports) {
  var ajaxGet = function (sUrl, fnSucceed, fnFaild) {
    var oAjax = null;
    if (window.XMLHttpRequest) {
      oAjax = new XMLHttpRequest();  //IE6以上
    } else {
      oAjax = new ActiveXObject('Microsoft.XMLHTTP');  //IE6
    }
    oAjax.open('GET', sUrl, true);
    oAjax.send();
    oAjax.onreadystatechange = function () {
      if (oAjax.readyState == 4) {
        if (oAjax.status == 200 || oAjax.status == 0) {
          fnSucceed(oAjax.responseText);
        } else {
          if (fnFaild) {
            fnFaild();
          }
        }
      }
    };
  };
  var ajaxPost = function (sUrl, sPostData, fnSucceed, fnFaild) {
    var oAjax = null;
    if (window.XMLHttpRequest) {
      oAjax = new XMLHttpRequest();
    } else {
      oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    oAjax.open('POST', sUrl, true);
    oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    oAjax.send(sPostData);
    //4.接受服务器的返回
    oAjax.onreadystatechange = function () {
      //readyState状态：0，1，2，3，4
      if (oAjax.readyState == 4) {
        if (oAjax.status == 200 || oAjax.status == 0) {
          //200为成功，0为本地请求成功
          fnSucceed(oAjax.responseText);  //将返回值赋给成功函数
        } else {
          if (fnFaild) {
            fnFaild();
          }
        }
      }
    };
  };
  exports = {
    ajaxGet: ajaxGet,
    ajaxPost: ajaxPost
  };
  return exports;
}(AJAX);

return AJAX;
});