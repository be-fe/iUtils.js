/**
 * @file jsLoader.js
 * @author: lipenghui
 */
define(function (require, exports, module) {

    var jsLoader = function () {

        // 用作存储脚本信息
        var cache = {};
        // 用作生成不重复的客户端id
        var _cid = 0;
        // 用作存储其他loader实例需要运行的脚本任务
        var processCache = {};
        // 用作储存别名
        window.alias = {};

        // 加载状态标识
        var DONE = 'done';
        var REJECTED = 'rejected';
        var PENDING = 'pending';

        // 获取document,head
        var doc = document;
        var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;

        /**
         * 产生客户端id
         * @return {Number} [description]
         */
        function cid() {
            return _cid++;
        }

        /**
         * Script对象，储存需要加载的任务的基本信息
         * @param  {String} uri     uri 地址 | 需要执行的函数
         * @param  {String} type    任务类型
         */
        function Script(uri, type) {
            this.uri = uri;
            this.type = type;
            this.cid = cid();
            this.status = PENDING;
        }

        /**
         * 从缓存中获取需要的Script对象
         * 如果没有，新建一个
         * @param  {String} uri     uri 地址 | 需要执行的函数
         * @param  {String} type    任务类型
         * @return {Object}         需要的Script对象
         */
        function get(uri, type) {
            // 如果不存在于缓存中，创建一个新的Script对象
            return cache[uri] || (cache[uri] = new Script(uri, type));
        }

        /**
         * 获取真实地址
         * @param  {String} name [description]
         * @return {[type]}      return uri
         */
        function getAlias(name) {
            return alias[name];
        }

        function getCache(uri, type) {
            var opts = getAlias(uri);
            return opts ? get(opts.uri, opts.type) : get(uri, type);
        }

        // 处理
        var handler = {
            js: jsHandler,
            css: cssHandler,
            fn: fnHandler
        };

        // 对函数的处理
        function fnHandler(context, s) {
            // 函数不需要判断是否为正在加载状态
            try {
                s.uri();
                resolve(context, s);
            }
            catch (e) {
                s.error = e.message;
                resolve(context, s);
            }
        }

        // 对css请求的处理
        function cssHandler(context, s) {
            // 当其他Loader实体中的任务已经完成时
            if (s.status !== PENDING) {
                resolve(context, s);
                return;
            }
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet'
            link.href = s.uri;
            head.appendChild(link);
            resolve(context, s);
        };

        // 对js动态加载的处理
        function jsHandler(context, s) {

            // 处理已完成任务
            if (s.status !== PENDING) {
                resolve(context, s);
                return;
            }

            // 如果非第一个加载，将剩余的任务和任务关联的上下文塞进正在进行的进程中
            if (s.changeState) {
                processCache[s.cid] = processCache[s.cid] || [];
                processCache[s.cid].push({loader: context, s: s});
                return;
            }

            s.changeState = true;

            // 设置超时标志
            var isTimeout = true;
            var script = document.createElement('script');
            script.async = true;
            script.src = s.uri;

            // 如果支持onload事件
            var hasOnload = 'onload' in script;


            if (hasOnload) {
                script.onload = jsOnload;
                script.onerror = function () {
                    jsOnload('ScriptError');
                }
            }
            else {
                script.onreadystatechange = function () {
                    if (/loaded|complete/.test(script.readyState)) {
                        jsOnload();
                    }
                }
            }

            // 如果设置了超时，启动一个计时器
            if (context.timeout) {
                setTimeout(timeoutHandler, context.timeout);
            }

            head.appendChild(script);

            function jsOnload(error) {
                isTimeout = false;
                script.onload = script.onerror = script.onreadystatechange = null;
                head.removeChild(script);
                script = null;
                if (error && typeof error === 'string') {
                    s.error = error;
                }
                resolve(context, s);
            }

            function timeoutHandler() {
                if (isTimeout) {
                    console.log('timeout');
                    jsOnload('RequestTimeout');
                }
            }
        }

        function resolve(loader, s) {
            if (s.error) {
                loader.errors.push(s);
            }
            loader.done();
            var cache = processCache[s.cid];
            if (cache && !cache.length) {
                for (var i = 0, len = cache.length; i < len; i++) {
                    cache.shift().loader.done();
                }
            }
        }

        var Loader = function () {
            this.list = [];
            this.errors = [];
            this.timeout = [];
            this.callback = null;
        };

        Loader.prototype.then = function (src, type) {
            if (src === undefined) {
                throw new Error('木有参数');
            }

            //  修正参数
            if (!type) {
                if (typeof src === 'string') {
                    if (/\.css$|\.css\?/i.test(src)) {
                        type = 'css';
                    }
                    if (/\.js$|\.js\?/i.test(src)) {
                        type = 'js';
                    }
                }
                if (typeof src === 'function') {
                    type = 'fn'
                }
            }

            type = type || 'js';
            this.list.push(getCache(src, type));
            return this;
        };

        Loader.prototype.done = function (cb) {
            if (this.callback === null) {
                this.callback = cb;
            }
            if (!this.list.length) {
                this.callback && this.callback(this.errors);
                return;
            }
            var script = this.list.shift();
            handler[script.type](this, script);
            if (!this.called) {
                this.called = true;
                return new Loader();
            }
        };

        Loader.prototype.config = function (opts) {
            this.timeout = opts.timeout || 0;
            if (opts.alias && !opts.alias.length) {
                for (var i in alias) {

                }
                for (var i = opts.alias.length - 1; i >= 0; i--) {
                    alias[i] = opts.alias[i]
                }
            }
            return this;
        };

        return Loader;
    }

    module.exports = jsLoader;


});