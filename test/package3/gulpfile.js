gulp.task('build', function() {

    var requirejs = require('requirejs');

    requirejs.optimize({
        'findNestedDependencies': true,
        'baseUrl': './hehe/',
        'optimize': 'none',
        'include': ['first'],
        'out': './build/example.js',
        'onModuleBundleComplete': function(data) {
            var fs = require('fs'),
                amdclean = require('amdclean'),
                outputFile = data.path;

            fs.writeFileSync(outputFile, amdclean.clean({
                'filePath': outputFile
            }));
        }
    });
});