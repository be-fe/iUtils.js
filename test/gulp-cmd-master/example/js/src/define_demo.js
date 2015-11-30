/**
 * Created by nanwei on 15-4-5.
 */
define(function(require){
    var common = require('../common/common.nanwei');//模块内的依赖用相对路径
    //var common = require('../common/common1');//模块内的依赖用相对路径
    console.log('我依赖了'+ common);
});
