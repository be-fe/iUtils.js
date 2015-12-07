(function (ns, factory) {if (typeof define === 'function' && define.amd) {define(factory);}else if (typeof module === 'object' && module.exports) {module.exports = factory();}else {window[ns] = factory();}})('Utils', function () {

/*
 * from https://github.com/component/ie/blob/master/index.js
 */
var ie = {};
ie = function (exports) {
  function ie() {
    for (var v = 3, el = document.createElement('b'),
        // empty array as loop breaker (and exception-avoider) for non-IE and IE10+
        all = el.all || []; // i tag not well-formed since we know that IE5-IE9 won't mind
      el.innerHTML = '<!--[if gt IE ' + ++v + ']><i><![endif]-->', all[0];);
    // return the documentMode for IE10+ compatibility
    // non-IE will get undefined
    return v > 4 ? v : document.documentMode;
  }
  exports = ie;
  return exports;
}(ie);

return {ie:ie}
});