/**
 * Created by nanwei on 15-4-5.
 */
//开发时的配置，这里的配置会在打包后并自动去掉，不影响线上
seajs.config({
    base: 'http://localhost:9999/',
    alias: {
        "define_demo": 'js/src/define_demo'
    }
});
//入口文件
seajs.use('define_demo');