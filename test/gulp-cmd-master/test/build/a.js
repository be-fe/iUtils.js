define('d',function(){
    return 'd';
});
define('c',['d','e'],function( require, exports, module ){
    var d = require('d');
require('e');

    module.exports = d;
});

define('b',['c'],function(require){
    var c = require('c')
    return 'b'; 
});
define('a',['b','c'],function( require, exports, module ){
    var b = require('b');
    var c = require('c');
    module.exports = 'a' + ' ' + b;
});

