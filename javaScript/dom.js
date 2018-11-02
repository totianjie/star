var vendor = (function () {
    var elementStyle = document.createElement('div').style;
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})();

/**
 * eg:
 *      const transform = prefixStyle('transform');
 *      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
 * */
// 根据浏览器自动添加浏览器前缀
function prefixStyle (style) {
    if (vendor === false) {
        return false;
    }

    if (vendor === 'standard') {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

/** ==================== 添加class，删除class,是否有class,切换class ==================== */
/**
 *  IE 10+  Chrome 8.0+     Firefox 3.6+    Safari 5.1+
 *  obj.classList  // 返回的是一个数组  obj上的所有class
 *  obj.classList.add(class1, class2, ...);
 *  obj.classList.remove(class1, class2, ...)
 *  obj.contains(class);  有就返回true,没有就是false
 *  obj.toggle(class); 切换class 有就删除   没有就添加
 * */
// 去除首尾空格
function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 判断是否有class 有就返回true  没有返回false
function hasClass (obj, cls) {
    var objClass;
    if (!cls || trim(cls).length === 0) {
        console.log('未传入class');
    } else {
        objClass = trim(obj.className).replace(/\s+/g, ' ');
        if (obj.className.length === 0 || objClass.match(trim(cls))) {
            return true;
        } else {
            return false;
        }
    }
}

// 添加class    eg: addClass(obj, 'a');   添加多个用空格 addClass(obj, 'a b c');
function addClass (obj, cls) {
    var aCls, i, len;
    if (cls && trim(cls).length > 0) {
        aCls = trim(cls).replace(/\s+/g, ' ').split(' ');
        len = aCls.length;
        for (i = 0; i < len; i++) {
            if (!hasClass(obj, aCls[i])) {
                obj.className += ' ' + aCls[i]
            }
        }
        obj.className = trim(obj.className).replace(/\s+/g, ' ');
    } else {
        console.log('没有传入class 或者 传入的是一个空字符串');
    }
}

// 删除class    eg: removeClass(obj, 'a');   删除多个用空格 removeClass(obj, 'a b c');
function removeClass (obj, cls) {
    var aCls, i, len, str;
    if (cls && trim(cls).length > 0) {
        aCls = trim(cls).replace(/\s+/g, ' ').split(' ');
        len = aCls.length;
        str = obj.className;
        for (i = 0; i < len; i++) {
            if (hasClass(obj, aCls[i])) {
                str = str.replace(aCls[i], '');
            }
        }
        obj.className = str;
        obj.className = trim(obj.className).replace(/\s+/g, ' ');
    } else {
        console.log('没有传入class 或者 传入的是一个空字符串');
    }
}

//如果有如果有class就删除  没有就添加
function toggleClass (obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
}

/*function addClass (obj, cName) {
 var arr = obj.className.split(" ").concat(cName.split(" "));
 for (var i = 0; i < arr.length; i++) {
 for (var j = arr.length - 1; j > i; j--) {
 if (arr[i] == arr[j]) {
 arr.splice(j, 1)
 }
 }
 }
 obj.className = arr.join(" ");
 }*/

/*function removeClass (obj, cName) {
 var arr = obj.className.split(" "),
 arr1 = cName.split(" ");
 for (var i = 0; i < arr1.length; i++) {
 for (var j = 0; j < arr.length; j++) {
 if (arr1[i] == arr[j]) {
 arr.splice(j, 1);
 }
 }
 }
 obj.className = arr.join(" ");
 }*/

/** ==================== 元素获取 ==================== */
//获取class
function getByClass (obj, sClass) {
    if (obj.getElementsByClassName) { //兼容IE9+ chrome FF
        return obj.getElementsByClassName(sClass);
    } else {
        var aEle = obj.getElementsByTagName('*');

        var arr = [];

        for (var i = 0; i < aEle.length; i++) {
            //"red green"
            var aClass = aEle[i].className.split(' '); //['red','green']
            //sClass ->  'red'
            if (findInArr(sClass, aClass)) {
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}

// 通过name获取元素
function getByName (name) {
    return document.getElementsByName(name);
}

function getByTagName (tagName) {
    return document.getElementsByTagName(tagName);
}

// 通过id获取元素
function getById (id) {
    return document.getElementById(id);
}

// 获取第一个元素
function querySelector (tag) { //  querySelector ('ul li span'); 获取出来是一个
    return document.querySelector(tag);
}

// 获取出来是一组
function querySelectorAll (AllTag) { // querySelectorAll('ul li');  获取出来是一组
    return document.querySelectorAll(AllTag);
}

//下一个兄弟切点^~^obj 同级的
function nextSibling (obj) {
    if (obj.nextElementSibling) {
        return obj.nextElementSibling;
    } else {
        return obj.nextSibling;
    }
}

// var oNext=nextSibling(oLi);

//上一个兄弟节点  obj是同级的
function previousSibling (obj) {
    return obj.previousElementSibling || obj.previousSibling;
}

//首节点   这里的obj是父级
function firstChild (obj) {
    return obj.firstElementChild || obj.firstChild;
}

//尾节点
function lastChild (obj) {
    return obj.lastElementChild || obj.lastChild;
}

//获取非行问样式
function getStyle (obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}

function getComputedStyle (el) {
    // return Vue.prototype.$isServer ? {} : document.defaultView.getComputedStyle(el);
    return document.defaultView.getComputedStyle(el);
}

//实时统计输入字数  //完美版
function fnInput (obj, fn) {
    if (window.navigator.userAgent.indexOf('MSIE 9.0') > 0) {
        var timer = null;
        //IE9中删除有问题的  解决方案
        obj.onfocus = function () {
            timer = setInterval(function () {
                fn && fn();
            }, 30);
        };
        obj.onblur = function () {
            clearInterval(timer);
        };
    } else {
        //oninput IE9+ chrome FF        onpropertychange IE10 9 8 7
        obj.oninput = obj.onpropertychange = function () {
            fn && fn();
        };
    }
}

//获取绝对位置
function getPos (obj) {
    var l = 0;
    var t = 0;
    while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {left: l, top: t};
}
// 添加 style
export function setStyle (element, styleName, value) {
    if (!element || !styleName) return;

    if (typeof styleName === 'object') {
        for (var prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                setStyle(element, prop, styleName[prop]);
            }
        }
    } else {
        // if (styleName === 'opacity' && (myBrowser() === 'IE8')) {
        if (styleName === 'opacity') { // 只有在ie9以下才需要  所以用的时候还得改一下
            element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
        } else {
            element.style[styleName] = value;
        }
    }
};
/** ==================== 获取元素偏移量 位置 ==================== */
/**
 * 通过向上迭代offsetParent,可以计算出相对于document的偏移量，也就是相对与页面的偏移量。
 * 此方法的问题:
 *  1)对于使用表格和内嵌框架布局的页面，由于不同浏览器实现元素方式的差异，得到的结果就不精确了。
 *  2)每次都需要一级一级向上查找offsetParent，效率太低。
 * */
function getOffsetSum (ele) {
    var top = 0, left = 0;
    while (ele) {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }
    return {
        top: top,
        left: left
    }
}

/**
 * 获取相对与视口的偏移量(viewpoint)加上页面的滚动量(scroll)
 * 此方法直接通过getBoundingClientRect()方法获得相对于视口的偏移量，加上页面的滚动量，
 * 减去clientTop，clientLeft (IE8及更低版本浏览器将(2,2)作为起点坐标，所以要将值减去起点坐标，其他浏览器都是已(0,0)作为起点坐标)。
 * getBoundingClientRect()方法支持IE,ff3+,safari4+,Orear9,5,Chrome.
 * */
function getOffsetRect (ele) {
    var box = ele.getBoundingClientRect();
    var body = document.body,
        docElem = document.documentElement;
    //获取页面的scrollTop,scrollLeft(兼容性写法)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop,
        clientLeft = docElem.clientLeft || body.clientLeft;
    var top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;
    return {
        //Math.round 兼容火狐浏览器bug
        top: Math.round(top),
        left: Math.round(left)
    }
}

//获取元素相对于页面的偏移
function getPosition (ele) {
    if (ele.getBoundingClientRect) {
        return getOffsetRect(ele);
    } else {
        return getOffsetSum(ele);
    }
}

/** ==================== 事件绑定 ==================== */
//事件绑定  同一元素 同一事件 执行不同的函数
// eg: addEvent(oUl, 'click', function () {});
function addEvent (obj, sEv, fn) {
    if (obj.addEventListener) {
        //IE9+ chrome  FF
        obj.addEventListener(sEv, fn, false)
    } else {
        //IE10 9 8 7..
        obj.attachEvent('on' + sEv, fn);
    }
}

//解绑定   解绑定后就什么都不执行了   相当于就没有了
function removeEvent (obj, sEv, fn) {
    if (obj.removeEventListener) {
        //IE9+ chrome FF
        obj.removeEventListener(sEv, fn, false);
    } else {
        obj.detachEvent('on' + sEv, fn);
    }
}

/** ==================== 滚轮事件 ==================== */
//滚轮事件 里面加了事件绑定
// addWheel(oBox, function (bDown) { //bDown是方true/false });
function addWheel (obj, fn) {
    function wheel (ev) {
        var oEvent = ev || event;
        var bDown = true;

        if (oEvent.wheelDelta) {
            if (oEvent.wheelDelta < 0) {
                bDown = true;
            } else {
                bDown = false;
            }
        } else {
            if (oEvent.detail < 0) {
                bDown = false;
            } else {
                bDown = true;
            }
        }
        //bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail<0;//上面if else  的高级写法现在看不懂
        //把方向返回出去
        fn(bDown);
        //判断有没有有就执行
        oEvent.preventDefault && oEvent.preventDefault();//阻止默认行为return false 碰到事件绑定就失效了所以用这个  解决兼容高级浏览器
        return false;
    }

    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        obj.addEventListener('DOMMouseScroll', wheel, false);
    } else {
        //obj.onmousewheel=wheel;
        addEvent(obj, 'mousewheel', wheel);
    }
}

/** ==================== DOMReady ==================== */
//DOMReady  只要DOM结构加载完毕就执行  比window.onlod 快
function domReady (fn) {
    if (document.addEventListener) {
        //IE9+ chrome FF
        document.addEventListener('DOMContentLoaded', function () {
            fn && fn();
        }, false);
    } else {
        //IE8
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState) {
                fn && fn();
            }
        });
    }
}
var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        getTarget: function (event) {
            return event.target || event.srcElement;
        },
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
        // 取得键码
        getCharCode: function(event){ // 取得了字符编码之后，就可以使用String.fromCharCode()将其转换成实际的字符
            if (typeof event.charCode == "number"){
                return event.charCode;
            } else {
                return event.keyCode;
        }
}
    };
