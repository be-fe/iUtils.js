/*
 * seajs(CMD) Module combo pulgin for gulp
 * Author : nanwei
 * Date : 2015-03-31
 * 备注 seajs.config只有在seajs.use的时候有用
 *
 *
 * 在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置
 * 在全局检索模式下，exec永远只返回第一个匹配，并且提供子表达式匹配的文本的信息，下次执行时会返回第二个
 */

var Promise = require('promise'),
    fs = require('fs'),
    path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    execPlugins = require('./lib/execplugins'),

    rFirstStr = /[\s\r\n\=]/,// 匹配空格换行回车=
    rDefine = /define\(\s*(['"](.+?)['"],)?/,// ?的含义 匹配具名define 例如：define('e',和define(
    rDeps = /(['"])(.+?)\1/g, // \1 代表第一括号捕获的，所以这里匹配 "dd",但不匹配'ee"
    rAlias = /alias\s*\:([^\}]+)\}/,//匹配 alias :{ss:3434}
    rPaths = /paths\s*\:([^\}]+)\}/,//匹配 path :{ss:3434}
    rVars = /vars\s*\:([^\}]+)\}/, //匹配 vars :{ss:3434}
    rVar = /\{([^{]+)}/g, //匹配 {ssee:3434,ee:333}
    rSeajsConfig = /seajs\.config\([^\)]+\);?/g, // 匹配 seajs.config({});
    rModId = /([^\\\/?]+?)(\.(?:js))?([\?#].*)?$/, //匹配不以路径/\开头的 k.js?797798/787/
    rQueryHash = /[\?#].*$/, //匹配 ?hash
    rExistId = /define\(\s*['"][^\[\('"\{\r\n]+['"]\s*,?/,// 匹配 define('rr',
/*
 "(?:\\" | [ ^ "])*"
 |
 '(?:\\' | [ ^ '])*'
 |
 \/\*[\S\s]*?\*\/
 |
 \/(?:\\\/|[^\/\r\n])+\/(?=[^\/])
 |
 \/\/.*
 |
 \.\s*seajs\.use
 |
 (?:^|[^$])\bseajs\.use\s*\((.+)

 这里有7个分组 会匹配以下内容
 1 "\"dd"
 2 '\'dd'
 3 \/* 6687 *\/
 4 /686\/76/
 5 //gjghgj
 6 .   seajs.use
 7  ^seajs.use("shfkhfd")
 */
    rSeajsUse = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*seajs\.use|(?:^|[^$])\bseajs\.use\s*\((.+)/g,

// 和上面的类似，只是匹配的是require
    rRequire = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;

const PLUGIN_NAME = 'gulp-cmd';

/*
 * 过滤忽略模块 含路径的为精确匹配，不含的话，为模糊匹配
 * param { Array } 忽略模块列表
 * param { String } 模块名
 * param { String } 模块标识
 * return { Boolean } 是否在忽略列表中
 */
var filterIgnore = function (ignore, id, origId) {
        return ignore.some(function (item) {
            var arr;

            // 含路径的模块id只过滤精确匹配的结果
            if (~item.indexOf('/')) {
                return item === origId;
            }
            // 不含路径的模块id将过滤所有匹配结果
            // ui 将匹配 ../ui 和 ../../ui
            else {
                // 使用id过滤忽略模块时要去掉自动添加的 gulp-cmd
                if (~id.indexOf(PLUGIN_NAME)) {
                    arr = id.split('_');
                    id = arr.slice(0, -2).join('_');
                }

                return item === id;
            }
        });
    },

/*
 * 初始化插件
 * param { Object } 老配置对象
 * param { Object } 新忽略列表
 */
    initPlugins = function (options, o) {
        o.plugins = {};

        options.plugins.forEach(function (item) {
            item.ext.forEach(function (name) {
                o.plugins[name] = item.use;
            });
        });
    },

/*
 * 提取config中的配置，会忽略包含变量的配置，只提取纯字符串
 * param{ String } config字符串
 * return{ Object } 提取出来的配置
 */
    evalConfig = function (configStr) {
        var configArr = [],
            config = {};

        configStr = configStr.replace(/\{/, '');
        configArr = configStr.split(',');

        configArr.forEach(function (item) {
            var index, key, value;

            index = item.indexOf(':');
            key = item.slice(0, index).replace(/['"]/g, '');
            value = item.slice(index + 1);

            key = key.trim();
            value = value.trim();

            try {
                value = eval('(function(){return ' + value + '})()');
                config[key] = value;
            }
            catch (_) {
            }
        });

        return config;
    },

/*
 * 解析config字符串，尝试提取alias、paths、vars
 * param{ String } 文件内容
 * return{ Object } 提取出来的配置和提取后的文件内容
 */
    parseConfig = function (contents) {
        var config = {};

        contents = contents.replace(rSeajsConfig, function ($) {
            $.replace(rAlias, function (_, $1) {
                config.alias = evalConfig($1);
            });

            $.replace(rPaths, function (_, $1) {
                config.paths = evalConfig($1);
            });

            $.replace(rVars, function (_, $1) {
                config.vars = evalConfig($1);
            });

            return '';
        });

        return {
            contents: contents,
            config: config
        }
    },

/*
 * 基于base将依赖模块的相对路径转化成绝对路径
 * 同时对seajs.config中的paths、alias、vars，还有options.map进行处理
 * param { Object } 数据存储对象
 * param { Array } 依赖模块的相对路径列表
 * param { String } 基础路径
 * return { Array } 依赖模块的绝对路径列表
 */
    mergePath = function (options, deps, base) {
        var config = options.config;

        return deps.map(function (item, i) {
            var origId = item.origId,
                arr, modId;

            // 防止多次merge
            if (item.path) {
                return;
            }

            // 处理build.json => map
            if (options.map && options.map[origId]) {
                origId = options.map[origId];
            }

            // 处理seajs.config => vars
            if (config.vars) {
                if (~origId.indexOf('{')) {
                    origId = origId.replace(rVar, function ($, $1) {
                        if (config.vars[$1]) {
                            return config.vars[$1];
                        }

                        return $;
                    });
                }
            }

            // 处理seajs.config => alias
            if (config.alias && config.alias[origId]) {
                origId = config.alias[origId];
            }

            // 处理seajs.config => paths
            if (config.paths) {
                arr = origId.split('/');
                modId = arr.splice(arr.length - 1, 1);

                arr.forEach(function (_item, i) {
                    if (config.paths[_item]) {
                        arr[i] = config.paths[_item];
                    }
                });

                arr = arr.concat(modId);
                origId = arr.join('/');
            }

            return {
                id: item.id,
                extName: item.extName,
                path: path.resolve(base, origId),
                origId: origId
            };
        });
    },

/*
 * 解析模块标识
 * param { Object } 配置参数
 * param { String } 模块标识
 * return { Object } filePath: 过滤query和hash后的模块标识,id: 模块id,extName: 模块后缀
 */
    modPathResolve = function (options, filePath) {
        // 过滤query(?)和hash(#)
        filePath = filePath.replace(rQueryHash, '');

        var id = filePath.match(rModId)[1],// 匹配模块名 /a/b.js?t=1 中匹配 b
            extName = path.extname(filePath);

        if (extName && extName === '.js') {
            id = id.replace(extName, '');
        }

        return {
            id: id,
            path: filePath,
            extName: extName
        };
    },

/*
 * 解析依赖模块列表，如果有依赖模块则开始解析依赖模块
 * param { Object } 配置参数
 * param { Array } 依赖模块
 * param { promise }
 */
    readDeps = function (options, parentDeps) {
        var childDeps = [];

        var promiseArr = parentDeps.map(function (item) {
            return new Promise(function (resolve, reject) {
                var id = item.id,
                    extName = item.extName,
                    filePath = item.path,
                    origId = item.origId,
                    contents, stream, plugins = [], deps, isIgnore;

                isIgnore = options.ignore ?
                    filterIgnore(options.ignore, id, origId) :
                    false;

                // 检测该模块是否在忽略列表中
                if (isIgnore) {
                    options.modArr.push({
                        id: id,
                        path: filePath,
                        contents: '', // 把内容置为空，这样合并的时候就相当于不会合并进去了
                        extName: extName,
                        origId: origId
                    });
                    resolve();
                    return;
                }

                // 处理特殊的模块，如 tpl 模块（需额外的插件支持）
                // 根据模块后缀来匹配是否使用插件
                if (extName && !~extName.indexOf('.js') && options.plugins && options.plugins[extName]) {
                    plugins = options.plugins[extName];

                    if (!plugins) {
                        reject("Can't combo unkonwn module [" + filePath + "]");
                        return;
                    }

                    // 有插件则执行插件
                    stream = execPlugins(filePath, plugins);

                    stream.on('end', function () {
                        resolve();
                    });

                    stream.pipe(through.obj(function (file, enc, _callback) {
                        parseDeps(options, file.contents.toString(), item);
                        _callback(null, file);
                    }));
                }
                // 处理普通的js模块
                else {
                    if (filePath.slice(-3) !== '.js') {
                        filePath += '.js'
                    }

                    try {
                        contents = fs.readFileSync(filePath, options.encoding);
                    }
                    catch (_) {
                        reject("File [" + filePath + "] not found.");
                        return;
                    }

                    deps = parseDeps(options, contents, item);

                    if (deps.length) {
                        childDeps = childDeps.concat(deps);
                    }

                    resolve();
                }
            });
        });

        return Promise.all(promiseArr).then(function () {
            if (childDeps.length) {
                return readDeps(options, childDeps);
            }
        }, function (err) {
            gutil.log(gutil.colors.red(PLUGIN_NAME + ' Error: ' + err));
        })
            .catch(function (err) {
                gutil.log(gutil.colors.red(PLUGIN_NAME + ' error: ' + err.message));
                console.log(err.stack);
            });
    },

/*
 * 提取依赖模块
 * param { Object } 配置参数
 * param { RegExp } 提取正则
 * param { Object } 文件内容
 * return { Array } 依赖模块列表
 */
    pullDeps = function (options, reg, contents) {
        var deps = [],
            matches, origId, depPathResult;

        reg.lastIndex = 0;

        while ((matches = reg.exec(contents)) !== null) {
            origId = matches[2]; // 文件中定义的依赖

            if (origId && origId.slice(0, 4) !== 'http') {
                depPathResult = modPathResolve(options, origId);

                deps.push({
                    id: depPathResult.id, // 文件中定义的依赖的文件名
                    origId: depPathResult.path, // 文件中定义的依赖(带路径，且去掉了hash)
                    extName: depPathResult.extName
                });
            }
        }

        return deps;
    },

/*
 * 解析依赖模块
 * param { Object } 配置参数
 * param { String } 文件内容
 * param { Object } 模块数据
 * return { Array } 依赖模块数据列表
 */
    parseDeps = function (options, contents, modData) {
        var isSeajsUse = !!~contents.indexOf('seajs.use('),
            id = modData.id,
            deps = [],
            configResult, name, base, matches;

        // 标准模块
        if (!isSeajsUse) {
            deps = pullDeps(options, rRequire, contents);
        }
        // 解析seajs.use // 只有在use的时候才会读取seajs.config
        else {
            configResult = parseConfig(contents);
            contents = configResult.contents;

            for (name in configResult.config) {
                options.config[name] = configResult.config[name];
            }

            matches = contents.match(rSeajsUse);

            matches.forEach(function (item) {
                var _deps = [];

                if (~item.indexOf('seajs.use')) {
                    _deps = pullDeps(options, rDeps, item);
                    deps = deps.concat(_deps);
                }
            });
        }

        base = path.resolve(modData.path, '..');
        deps = mergePath(options, deps, base);

        options.modArr.push({
            id: id,
            deps: deps,
            path: modData.path,
            contents: contents,
            extName: modData.extName,
            origId: modData.origId || id
        });

        return deps;
    },

/*
 * 转换模块内容 给模块加id
 * param { Object } 配置参数
 * param { Object } 模块数据
 * param { Object } id映射表
 * return { String } 文件内容
 */
    transform = function (options, modData, idMap) {
        var contents = modData.contents,
            isSeajsUse = !!~contents.indexOf('seajs.use('),
            origId = modData.origId,
            deps = [];

        // 标准模块
        if (!isSeajsUse) {
            contents = contents.replace(rRequire, function ($, _, $2) {
                var result = $,
                    depId, depOrigId, depPathResult, firstStr;

                if ($2 && $2.slice(0, 4) !== 'http') {
                    depPathResult = modPathResolve(options, $2);
                    firstStr = result.charAt(0);
                    depOrigId = depPathResult.path;
                    depId = idMap[depOrigId] || depPathResult.id;
                    deps.push(depId);

                    result = "require('" + depId + "')";

                    if (rFirstStr.test(firstStr)) {
                        result = firstStr + result;
                    }
                }

                return result;
            });

            // 为未包裹的模块提供define包裹
            if (!rDefine.test(contents)) {
                contents = "define(function (require, exports, module) {" + contents + "});";
            }

            // 为匿名模块添加模块名，同时将依赖列表添加到头部
            contents = contents.replace(rDefine, function () {
                var id = idMap[origId];

                return deps.length ?
                "define('" + id + "',['" + deps.join("','") + "']," :
                "define('" + id + "',";
            });
        }
        else {
            contents = contents.replace(rSeajsUse, function ($) {
                var result = $;

                if (~$.indexOf('seajs.use(')) {
                    result = $.replace(rDeps, function ($, _, $2) {
                        var _result = $,
                            depPathResult, depId;

                        if ($2 && $2.slice(0, 4) !== 'http') {
                            depPathResult = modPathResolve(options, $2);
                            depId = depPathResult.id;

                            _result = "'" + depId + "'";
                        }

                        return _result;
                    });
                }

                return result;
            });
        }

        return contents;
    },

/*
 * 合并模块内容
 * param { Object } 配置参数
 * return { String } 文件内容
 */
    comboContent = function (options) {
        var idUnique = {},
            pathUnique = {},
            contents = '',
            idMap = {},
            newModArr = [];

        options.modArr.forEach(function (item, i) {
            var id = item.id,
                filePath = item.path;

            if (!pathUnique[filePath]) {
                pathUnique[filePath] = true;
                newModArr.push(item);

                if (idUnique[id]) {
                    id = id + '_' + PLUGIN_NAME + '_' + i;
                }
                else {
                    idUnique[id] = true;
                }

                idMap[item.origId] = id;
            }
        });

        newModArr.forEach(function (item) {
            var newContents = transform(options, item, idMap);
            if (newContents) {
                contents = newContents + '\n' + contents;
            }

            if (options.verbose) {
                gutil.log('gulp-cmd:', '✔ Module [' + item.path + '] combo success.');
            }
        });

        return new Buffer(contents);
    },


/*
 * 解析模块的内容，如果有依赖模块则开始解析依赖模块
 * param { Object } 数据存储对象
 * param { String } 文件内容
 * param { String } 模块的绝对路径
 * param { promise }
 */
    parseContent = function (options, contents, filePath) {
        return new Promise(function (resolve) {
            var pathResult = modPathResolve(options, filePath),
                deps = parseDeps(options, contents, pathResult); // 解析入口js

            if (deps.length) {
                resolve(readDeps(options, deps)); // 解析完整依赖
            }
            else {
                resolve();
            }
        });
    },

// 插件入口函数
    createStream = function (options) {
        var o = {
            modArr: [],
            config: {},
            unique: {},
            uuid: 0,
            contents: '',
            encoding: 'UTF-8',
            verbose: !!~process.argv.indexOf('--verbose')
        };

        if (options) {
            if (options.ignore) {
                o.ignore = options.ignore;
            }

            if (options.map) {
                o.map = options.map;
            }

            if (options.encoding) {
                o.encoding = options.encoding;
            }

            if (options.plugins) {
                initPlugins(options, o);
            }
        }

        return through.obj(function (file, enc, callback) {
            if (file.isBuffer()) {
                parseContent(o, file.contents.toString(), file.path)
                    .then(function () {
                        var contents = comboContent(o); // 合并模块
                        file.contents = contents;
                        callback(null, file);
                    })
                    .catch(function (err) {
                        gutil.log(gutil.colors.red(PLUGIN_NAME + ' error: ' + err.message));
                        console.log(err.stack);
                        callback(null, file);
                    });
            }
            else {
                callback(null, file);
            }
        });
    };

module.exports = createStream;
