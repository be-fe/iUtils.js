;(function() {
/**
 * @file closest.js
 */
var dom_closest = {}, dom_forceReflow = {}, dom_getComputedStyle = {}, dom_getDocumentScrollTop = {}, dom_getElementByClassName = {}, dom_getOffset = {}, dom_getPageSize = {}, dom_getPosition = {}, dom_getStyle = {}, dom_height = {}, dom_insertAfter = {}, dom_matches = {}, dom_outerHeight = {}, dom_outerHeightWithMargin = {}, dom_outerWidth = {}, dom_outerWidthWithMargin = {}, dom_removeElement = {}, dom_setDocumentScrollTop = {}, dom_scrollTo = {}, dom_setStyle = {}, dom_width = {};
dom_closest = function (exports) {
  /**
   * @return HTMLElements || null
   */
  var closest = function (el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return null;
  };
  exports = closest;
  return exports;
}(dom_closest);
dom_forceReflow = function (exports) {
  /**
   * @return null
   */
  var forceReflow = function (el) {
    el.offsetHeight;
  };
  exports = forceReflow;
  return exports;
}(dom_forceReflow);
dom_getComputedStyle = function (exports) {
  /**
   * @return CssStyle
   */
  var getComputedStyle = function (el) {
    return el.ownerDocument.defaultView.getComputedStyle(el, null);
  };
  exports = getComputedStyle;
  return exports;
}(dom_getComputedStyle);
dom_getDocumentScrollTop = function (exports) {
  /**
   * @return Number
   */
  var getDocumentScrollTop = function () {
    return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
  };
  exports = getDocumentScrollTop;
  return exports;
}(dom_getDocumentScrollTop);
dom_getElementByClassName = function (exports) {
  /**
   * @return HTMLNodeList
   * @params HTMLElement node, String  classname
   */
  var getElementByClassName = function (node, classname) {
    if (node.getElementsByClassName) {
      // use native implementation if available
      return node.getElementsByClassName(classname);
    } else {
      return function getElementsByClass(searchClass, node) {
        if (node == null)
          node = document;
        var classElements = [], els = node.getElementsByTagName('*'), elsLen = els.length, pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)'), i, j;
        //也可以用单词边界：只要两边是\b就可以了，说明这个单词是独立的
        for (i = 0, j = 0; i < elsLen; i++) {
          if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
          }
        }
        return classElements;
      }(classname, node);
    }
  };
  exports = getElementByClassName;
  return exports;
}(dom_getElementByClassName);
dom_getOffset = function (exports) {
  /**
   * @return Object
   */
  var getOffset = function (el) {
    var html = el.ownerDocument.documentElement;
    var box = {
      top: 0,
      left: 0
    };
    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    if (typeof el.getBoundingClientRect !== 'undefined') {
      box = el.getBoundingClientRect();
    }
    return {
      top: box.top + window.pageYOffset - html.clientTop,
      left: box.left + window.pageXOffset - html.clientLeft
    };
  };
  exports = getOffset;
  return exports;
}(dom_getOffset);
dom_getPageSize = function (exports) {
  /**
   * @return Object
   */
  var getPageSize = function () {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
      xScroll = window.innerWidth + window.scrollMaxX;
      yScroll = window.innerHeight + window.scrollMaxY;
    } else {
      if (document.body.scrollHeight > document.body.offsetHeight) {
        // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
      } else {
        // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
      }
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) {
      // all except Explorer
      if (document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
      } else {
        windowWidth = self.innerWidth;
      }
      windowHeight = self.innerHeight;
    } else {
      if (document.documentElement && document.documentElement.clientHeight) {
        // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
      } else {
        if (document.body) {
          // other Explorers
          windowWidth = document.body.clientWidth;
          windowHeight = document.body.clientHeight;
        }
      }
    }
    var pageHeight, pageWidth;
    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
      pageHeight = windowHeight;
    } else {
      pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
      pageWidth = xScroll;
    } else {
      pageWidth = windowWidth;
    }
    return {
      pageWidth: pageWidth,
      pageHeight: pageHeight,
      windowWidth: windowWidth,
      windowHeight: windowHeight
    };
  };
  exports = getPageSize;
  return exports;
}(dom_getPageSize);
dom_getPosition = function (exports) {
  /**
   * @return Object
   */
  var getPosition = function (el) {
    if (!el) {
      return {
        left: 0,
        top: 0
      };
    }
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  };
  exports = getPosition;
  return exports;
}(dom_getPosition);
dom_getStyle = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  /**
   * @return String
   */
  var getStyle = function (el, att, style) {
    style = style || el.style;
    var val = '';
    if (style) {
      val = style[att];
      if (val === '') {
        val = getComputedStyle(el, att);
      }
    }
    return val;
  };
  exports = getStyle;
  return exports;
}(dom_getStyle);
dom_height = function (exports) {
  var getComputedStyles = dom_getComputedStyle;
  /**
   * @return Number
   * @param HTMLElement el
   */
  var height = function (el) {
    const styles = getComputedStyles(el);
    const height = parseFloat(styles.height.indexOf('px') !== -1 ? styles.height : 0);
    const boxSizing = styles.boxSizing || 'content-box';
    if (boxSizing === 'border-box') {
      return height;
    }
    const borderTopWidth = parseFloat(styles.borderTopWidth);
    const borderBottomWidth = parseFloat(styles.borderBottomWidth);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);
    return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
  };
  exports = height;
  return exports;
}(dom_height);
dom_insertAfter = function (exports) {
  /**
   * @return null
   * @param HTMLElement newEl, HTMLElement targetEl
   */
  var insertAfter = function (newEl, targetEl) {
    var parent = targetEl.parentNode;
    if (parent.lastChild === targetEl) {
      parent.appendChild(newEl);
    } else {
      parent.insertBefore(newEl, targetEl.nextSibling);
    }
  };
  exports = insertAfter;
  return exports;
}(dom_insertAfter);
dom_matches = function (exports) {
  /**
   * @return Boolean
   */
  var matches = function (el, selector) {
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
  };
  exports = matches;
  return exports;
}(dom_matches);
dom_outerHeight = function (exports) {
  /**
   * @return Number
   */
  var outerHeight = function (el) {
    return el.offsetHeight;
  };
  exports = outerHeight;
  return exports;
}(dom_outerHeight);
dom_outerHeightWithMargin = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  /**
   * @return Number
   */
  var outerHeightWithMargin = function (el) {
    var height = el.offsetHeight;
    const style = getComputedStyle(el);
    height += (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
    return height;
  };
  exports = outerHeightWithMargin;
  return exports;
}(dom_outerHeightWithMargin);
dom_outerWidth = function (exports) {
  /**
   * @return Number
   */
  var outerWidth = function (el) {
    return el.offsetWidth;
  };
  exports = outerWidth;
  return exports;
}(dom_outerWidth);
dom_outerWidthWithMargin = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  /**
   * @return Number
   */
  var outerWidthWithMargin = function (el) {
    var width = el.offsetWidth;
    const style = getComputedStyle(el);
    width += (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
    return width;
  };
  exports = outerWidthWithMargin;
  return exports;
}(dom_outerWidthWithMargin);
dom_removeElement = function (exports) {
  /**
   * @return null
   * @param HTMLElement el
   */
  var removeElement = function (el) {
    if (typeof el === 'string') {
      // it's an query string
      [].forEach.call(document.querySelectorAll(el), function (node) {
        node.parentNode.removeChild(node);
      });
    } else if (el.parentNode) {
      // it's an Element
      el.parentNode.removeChild(el);
    } else if (el instanceof NodeList) {
      // it's an array of elements
      [].forEach.call(el, function (node) {
        node.parentNode.removeChild(node);
      });
    } else {
      throw new Error('you can only pass Element, array of Elements or query string as argument');
    }
  };
  exports = removeElement;
  return exports;
}(dom_removeElement);
dom_setDocumentScrollTop = function (exports) {
  /**
   * @return Number
   * @param value
   */
  var setDocumentScrollTop = function (value) {
    window.scrollTo(0, value);
    return value;
  };
  exports = setDocumentScrollTop;
  return exports;
}(dom_setDocumentScrollTop);
dom_scrollTo = function (exports) {
  var getDocumentScrollTop = dom_getDocumentScrollTop;
  var setDocumentScrollTop = dom_setDocumentScrollTop;
  /**
   * @param Number to, Number duration
   * @return
   */
  var scrollTo = function (to, duration) {
    var to = 0;
    var duration = 16;
    if (duration < 0) {
      return;
    }
    var diff = to - getDocumentScrollTop();
    if (diff === 0) {
      return;
    }
    var perTick = diff / duration * 10;
    requestAnimationFrame(function () {
      if (Math.abs(perTick) > Math.abs(diff)) {
        setDocumentScrollTop(getDocumentScrollTop() + diff);
        return;
      }
      setDocumentScrollTop(getDocumentScrollTop() + perTick);
      if (diff > 0 && getDocumentScrollTop() >= to || diff < 0 && getDocumentScrollTop() <= to) {
        return;
      }
      this.scrollTo(to, duration - 16);
    });
  };
  exports = scrollTo;
  return exports;
}(dom_scrollTo);
dom_setStyle = function (exports) {
  var getComputedStyle = dom_getComputedStyle;
  /**
   * @param
   * @return
   */
  var setStyle = function (node, att, val, style) {
    var reUnit = /width|height|top|left|right|bottom|margin|padding/i;
    style = style || node.style;
    if (style) {
      if (val === null || val === '') {
        // normalize unsetting
        val = '';
      } else if (!isNaN(Number(val)) && reUnit.test(att)) {
        // number values may need a unit
        val += 'px';
      }
      if (att === '') {
        att = 'cssText';
        val = '';
      }
      style[att] = val;
    }
  };
  exports = setStyle;
  return exports;
}(dom_setStyle);
dom_width = function (exports) {
  var getComputedStyles = dom_getComputedStyle;
  /**
   * @return Number
   * @param HTMLElement el
   */
  var width = function (el) {
    var styles = getComputedStyles(el);
    var width = parseFloat(styles.width.indexOf('px') !== -1 ? styles.width : 0);
    var boxSizing = styles.boxSizing || 'content-box';
    if (boxSizing === 'border-box') {
      return width;
    }
    var borderLeftWidth = parseFloat(styles.borderLeftWidth);
    var borderRightWidth = parseFloat(styles.borderRightWidth);
    var paddingLeft = parseFloat(styles.paddingLeft);
    var paddingRight = parseFloat(styles.paddingRight);
    return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
  };
  exports = width;
  return exports;
}(dom_width);
}());