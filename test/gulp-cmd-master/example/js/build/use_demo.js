define('common.nanwei',function (require, exports, module) {/**
 * Created by nanwei on 15-4-5.
 */

    console.log('I am common');
    module.exports = "common";
});
/**
 * Created by nanwei on 15-4-5.
 */
define('define_demo',['common.nanwei'],function(require){
    var common = require('common.nanwei');//模块内的依赖用相对路径
    //var common = require('../common/common1');//模块内的依赖用相对路径
    console.log('我依赖了'+ common);
});

/**
 * Created by nanwei on 15-4-5.
 */
//开发时的配置，这里的配置会在打包后并自动去掉，不影响线上

//入口文件
seajs.use('define_demo');
