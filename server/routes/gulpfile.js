var gulp =require('gulp');
var fs = require('fs');
var amdclean = require('amdclean');
var requirejs = require('requirejs');
var path = require('path');

var buildModules = ['cookie'];

gulp.task('build', function() {



    requirejs.optimize({
        'findNestedDependencies': true,
        'baseUrl': './src/modules/',
        'optimize': 'none',
        'include': buildModules,
        'out': './build/Utils.js',
        'onModuleBundleComplete': function(data) {

               var outputFile = data.path;

             fs.writeFileSync(outputFile, amdclean.clean({
                'filePath': outputFile
            }));

            var content = fs.readFileSync(path.join(__dirname, './build/Utils.js'));

            var string = content.toString();

            string = string.substring(14,string.length);
            string = string.substring(0,string.length - 5);

            // 前容器
            var before = "";
            before +="(function (ns, factory) {";
            before +="if (typeof define === 'function' && define.amd) {";
            before +="define(factory);";
            before +="}";
            before +="else if (typeof module === 'object' && module.exports) {";
            before +="module.exports = factory();";
            before +="}";
            before +="else {";
            before +="window[ns] = factory();";
            before +="}";
            before +="})('Utils', function () {";

            string = before + string;

            // return数组
            var returnString ="\nreturn {";
            for (var i = 0; i < buildModules.length; i++) {
                returnString += buildModules[i] +":" + buildModules[i] + ",";
            }
            // 去掉,
            var newString = returnString.substring(0, returnString.length-1);
            newString += "}";
            console.log("这里打印的是返回的数组:" +newString);

            string = string + newString;

            // 后容器
            var after = "\n});";

            string = string + after;

            // 写入文件
            fs.writeFileSync(path.join(__dirname, './build/Utils.js'), string);

        }
    });

});