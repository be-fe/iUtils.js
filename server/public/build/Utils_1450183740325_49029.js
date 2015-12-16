;(function() {
/**
 * @file jsLoader.js
 * @author: lipenghui
 */
var jsloader_jsloader = {}, keycode_getKeyName = {};
jsloader_jsloader = function (exports) {
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
    var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
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
      } catch (e) {
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
      link.rel = 'stylesheet';
      link.href = s.uri;
      head.appendChild(link);
      resolve(context, s);
    }
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
        processCache[s.cid].push({
          loader: context,
          s: s
        });
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
        };
      } else {
        script.onreadystatechange = function () {
          if (/loaded|complete/.test(script.readyState)) {
            jsOnload();
          }
        };
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
          type = 'fn';
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
          alias[i] = opts.alias[i];
        }
      }
      return this;
    };
    return Loader;
  };
  exports = jsLoader;
  return exports;
}(jsloader_jsloader);
keycode_getKeyName = function (exports) {
  var keyCodeHelper = function () {
    var self = this;
    this.keyCodeMap = {
      8: 'Backspace',
      9: 'Tab',
      13: 'Enter',
      16: 'Shift',
      17: 'Ctrl',
      18: 'Alt',
      19: 'Pause',
      20: 'Caps Lock',
      27: 'Escape',
      32: 'Space',
      33: 'Page Up',
      34: 'Page Down',
      35: 'End',
      36: 'Home',
      37: 'Left',
      38: 'Up',
      39: 'Right',
      40: 'Down',
      42: 'Print Screen',
      45: 'Insert',
      46: 'Delete',
      48: '0',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z',
      91: 'Windows',
      93: 'Right Click',
      96: 'Numpad 0',
      97: 'Numpad 1',
      98: 'Numpad 2',
      99: 'Numpad 3',
      100: 'Numpad 4',
      101: 'Numpad 5',
      102: 'Numpad 6',
      103: 'Numpad 7',
      104: 'Numpad 8',
      105: 'Numpad 9',
      106: 'Numpad *',
      107: 'Numpad +',
      109: 'Numpad -',
      110: 'Numpad .',
      111: 'Numpad /',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'Num Lock',
      145: 'Scroll Lock',
      182: 'My Computer',
      183: 'My Calculator',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
    };
    /**
     * @return String keyname
     * @params Number  keycode
     */
    this.getKeyName = function (keycode) {
      if (self.keyCodeMap[keycode]) {
        return self.keyCodeMap[keycode];
      } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
      }
    };
  };
  exports = new keyCodeHelper().getKeyName;
  return exports;
}(keycode_getKeyName);
}());