var gulp =require('gulp');
var fs = require('fs'),
    amdclean = require('amdclean');
var requirejs = require('requirejs');
var path = require('path');

gulp.task('build', function() {



    requirejs.optimize({
        'findNestedDependencies': true,
        'baseUrl': './modules/',
        'optimize': 'none',
        'include': ['sing', 'other'],
        'out': './build/Utils.js',
        'onModuleBundleComplete': function(data) {

               var outputFile = data.path;

            fs.writeFileSync(outputFile, amdclean.clean({
                'filePath': outputFile
            }));
        }
    });

    // 删掉前几个字符,后几个字符
    fs.readFile(path.join(__dirname, 'build/Utils.js'), function (err,bytesRead) {
        if (err) throw err;
        var string = bytesRead.toString();

        string = string.substring(14,string.length);
        string = string.substring(0,string.length - 5);

        console.log(string);


        fs.writeFile(path.join(__dirname, 'build/Utils.js'), string, function (err) {
            if (err) throw err;
            console.log("写入文件成功!");

            // 加外层容器,加return

        });


    });

});