/**
 * Created by tianjie on 2016/12/21.
 */
/**求字节长度*/
function getByLen (str, charset) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) >= '\u4e00' && str.charAt(i) <= '\u9fa5') {
            if (charset == 'gb2312') {
                len += 2;//gb2312
            } else {
                len += 3;//UTF-8
            }
        } else {
            len++;
        }
    }
    return len;

    /*
     * var str='a,b,c,田';
     *
     * var n=getByLen(str);   不写后面的参数就是UTF-8
     * alert(n);
     *
     * var n=getByLen(str,'gb2312');   gb2312 下面的
     * alert(n);
     *
     * */

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

// 补零
function toDou (n) {
    n = typeof n === 'number' ? n : parseInt(n);
    return n < 10 ? '0' + n : n;
}

// 查找字符串中出现最多的字符
function findMaximum (str) {
    /**
     * return {name: 字符, sum: 多少次}
     * */
    if (!str || str.length === 0) {
        return;
    }
    var arr = str.split('');
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (json[arr[i]]) {//看arr当中的每一个   在json里面有没有
            json[arr[i]]++;//有的话  ++
        } else {
            json[arr[i]] = 1;//没有的话就存一个进去   json中  json.name就是等于json的值
        }
    }
    var str2 = '';
    var n = 0;
    for (var name in json) {
        if (json[name] > n) {
            n = json[name];
            str2 = name;
        }
    }
    return {name: str2, sum: n}
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

/** ==================== 深度拷贝函数 ==================== */
function deepCopy (data) {
    var t = type(data),
        o, i, ni;
    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }
    if (t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
            o.push(deepCopy(data[i]));
        }
        return o;
    } else if (t === 'object') {
        for (i in data) {
            o[i] = deepCopy(data[i]);
        }
        return o;
    }

}

function type (obj) {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}

/** ==================== 数组的一些方法 排序,去重 .... ==================== */
// 在数组中查找一个东西是否存在
function findInArr (item, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return true;
        }
    }
    return false;
}

//数组里找最小值
function findMin (arr, start) {
    var count = arr[start];
    for (var i = start + 1; i < arr.length; i++) {
        if (arr[i] < count) {
            count = arr[i];
        }
    }
    return count;
}

// 冒泡排序
function bubbleSort (arr) {
    /**
     * 第二个循环里面就是每次都跟自己前一个比看是大还是小（看自己的需求）    就掉换位置就Ok了
     * */
    var i, j, len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {//拿当前这一个跟后面一个比(>从小到大)（<从大到小）
                var tmp;
                tmp = arr[j];//把当前的保存
                arr[j] = arr[j + 1];//掉换顺序
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}

// 并归排序  用的是二分法    eg: document.write(margeSort(arr,0,arr.length));
function margeSort (arr, s, e) {//s开始位置e结束位置
    var s = s || 0;
    var e = e || arr.length;
    if (s > e) {//开始大于啊结束
        return [];
    } else if (s == e) {//开始位置等于位置只有一位数
        return [arr[s]];
    } else if (s == e - 1) {//只有两位数的情况下

        if (arr[s] < arr[e]) {
            return [arr[s], arr[e]];
            //现在排的是从小到大  其它反之
        } else {
            return [arr[e], arr[s]];
        }
    }

    //取个中间位置分成两边  ceil向上取整
    var c = Math.ceil((s + e) / 2);
    var left = margeSort(arr, s, c);//自己掉用自己返回排好的顺序
    var right = margeSort(arr, c + 1, e);
    var aResult = [];

    while (left.length && right.length) {

        //把两个数组排好的序 进行整合
        if (left[0] < right[0]) {
            aResult.push(left.shift());
        } else {
            aResult.push(right.shift());
        }

        //其中有一个数组空了就把别一个剩下的整合
        if (left.length == 0) {
            aResult = aResult.concat(right);
        } else if (right.length == 0) {
            aResult = aResult.concat(left);
        }
    }

    return aResult;

}

// 快速排序
function quickSort (arr) {
    /**
     * 把数组分成两半    在使用递归方法
     */
    if (arr.length == 0) {
        return [];//返回一定是个空数组  不然会报错  因为在后面cancat的时候不是数组就错了
    }

    var index = Math.floor(arr.length / 2);//求出一个中间位置
    var c = arr.splice(index, 1);//中间位置的数值  用于做比较
    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < c) {//这里看自己需求  看是从大到小还是从小到大
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(c, quickSort(right));//分成了多段  直到执行完为止   一直在自己掉用自己

}

// 选择排序
function selectionSort (arr) {
    /**
     *  找最小或者最大的(看自己需求) 返回变化位置就好了
     */
    function findMinIndex (arr, index) {
        var iMin = arr[index];//当前查找的那一个的值
        var iMinIndex = index;

        for (var i = index; i < arr.length; i++) {
            if (iMin > arr[i]) {//找比自己小的 如果找到了就把自己变成那个最小的
                iMin = arr[i];
                iMinIndex = i;//把最小的位置保存下来  用于返回
            }
        }
        return iMinIndex;
    }

    for (var i = 0; i < arr.length; i++) {
        var index = findMinIndex(arr, i);//找最小值的位置
        var tmp = arr[i];//把当前这一个保存起来; 用于变位置后赋值
        arr[i] = arr[index];
        arr[index] = tmp;
    }
    return arr;
}

function sort (arr) {
    return arr.sort(function (n1, n2) {//排出来的没用字母是a-z  这样排的
        return n1 - n2;//从小到大排         数字可以用
        //return n2-n1;//从大到小排
    })
}

// 删除奇数
function deleteOdd (arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 1) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

// 删除偶数
function deleteEven (arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 0) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

// 数组去重
function unique (arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}

function unique2 (arr) {
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i + 1]) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

function unique3 (arr) {
    function findInArr (itme, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == itme) {
                return true;
            }
        }
        return false;
    }

    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (!findInArr(arr[i], arr2)) {
            arr2.push(arr[i]);
        }
    }
    return arr2;
}

function unique4 (arr) {
    var res = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (res.indexOf(parseInt(arr[i])) == -1) {
            res.push(arr[i]);
        }
    }
    return res;
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

/** ==================== 运动函数 ==================== */
// 运动函数  动画函数
function startMove (obj, json, options) {
    //判断默认值
    options = options || {};
    options.duration = options.duration || 500;
    options.easing = options.easing || 'ease-out';

    //准备运动需要东西
    var count = Math.floor(options.duration / 30);

    var start = {};
    var dis = {};

    for (var name in json) {
        start[name] = parseFloat(getStyle(obj, name));

        if (isNaN(start[name])) {
            //有事，没有给默认值
            switch (name) {
                case 'left':
                    start[name] = obj.offsetLeft;
                    break;
                case 'top':
                    start[name] = obj.offsetTop;
                    break;
                case 'width':
                    start[name] = obj.offsetWidth;
                    break;
                case 'height':
                    start[name] = obj.offsetHeight;
                    break;
                case 'marginLeft':
                    start[name] = 0;
                    break;
                case 'marginTop':
                    start[name] = 0;
                    break;
                case 'fontSize':
                    start[name] = 12;
                    break;
                //.......
            }
        }

        dis[name] = json[name] - start[name];
    }

    clearInterval(obj.timer);

    var n = 0;

    obj.timer = setInterval(function () {
        n++;

        for (var name in json) {

            switch (options.easing) {
                case 'linear':
                    var a = n / count;
                    var cur = start[name] + dis[name] * a;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var cur = start[name] + dis[name] * Math.pow(a, 3);
                    break;
                case 'ease-out':
                    var a = 1 - n / count;
                    var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));
                    break;
            }

            if (name == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
            } else {
                obj.style[name] = cur + 'px';
            }
        }

        if (n == count) {
            clearInterval(obj.timer);

            options.complete && options.complete();
        }
    }, 30);

}

/** ==================== cookie封装 ==================== */
//设置  cookie
function setCookie (name, value, iDay) {
    if (iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);

        document.cookie = name + '=' + value + ';path=/;expires=' + oDate.toUTCString();
    } else {
        document.cookie = name + '=' + value + ';path=/';
    }
}

//alert(document.cookie);
//name=strive; age=18; b=123; a=123
//获取cookie
function getCookie (name) {
    var arr = document.cookie.split('; ');

    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        //arr2[0] -> name   age
        //arr2[1] -> strive  18
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}

//删除cookie
function removeCookie (name) {
    setCookie(name, 'asdffdsa', -100);
}

/*
 var arr1 = [
 {id: 1, pId: 0, name: '标题'},
 {id: 2, pId: 1, name: '父级是id=1'},
 {id: 3, pId: 2, name: '父级是id=2'},
 {id: 4, pId: 3, name: '父级是id=3'},
 ];
 var arr2 = [
 {
 id: 1,
 pId: 0,
 child: [
 {
 id:2,
 pId: 1,
 child:[
 {
 id: 3,
 pId: 2,
 child: [
 {id: 4, pId: 3}
 ]
 }
 ]
 }
 ]
 }
 ];
 */

// 把arr1和格式转成arr2的格式   pId  重置数据格式   如果没有子级了默认是没有child这个字段的 如果需要就写个函数增加
function resetDataFormat (d) {
    var pidList = d;
    var afterList = d;
    cnode(pidList);
    return afterList;

    function cnode (d) {
        var n = afterList.length;
        var newData = null;
        var l = d.length;
        var i = 0;
        for (i = 0; i < l; i++) {
            if (n > 0) {
                newData = set(d[i].id, afterList);
                afterList = newData.data;
                if (newData.nodelist.length > 0) {
                    d[i].child = newData.nodelist;
                    cnode(d[i].child);
                }
            }
        }
    }

    function set (n, data) {
        n = parseInt(n, 10);
        var t = 0, l = 0, arr1 = [], arr2 = [], i = 0;
        l = data.length;
        for (i = 0; i < l; i++) {
            t = parseInt(data[i].pId, 10);
            if (t === n) {
                arr1.push(data[i]);
            } else {
                arr2.push(data[i]);
            }
        }
        return {nodelist: arr1, data: arr2};
    }
}

// 查看每一个数组是否有child 如果没有就加一个
function seachChildrenList (json) {
    if (!json.childrenList) {
        json.childrenList = [];
    }
    seach(json.childrenList);

    function seach (a) {
        var len = a.length;
        if (len) {
            a.forEach(function (item, index) {
                if (!item.childrenList) {
                    item.childrenList = [];
                } else {
                    if (item.childrenList instanceof Array && item.childrenList.length) {
                        seach(item.childrenList);
                    }
                }

            });
        }
    }

    return json;
}

// 把id  pid  的格式转成children的形式方法2
function ResetDataFormat2 (data) {
    this.tree = data || []; //数据
    this.groups = {}; //分组
}

ResetDataFormat2.prototype = {
    init: function (pid) {
        this.group();
        console.log(this.groups[pid]);
        var data = this.getData(this.groups[pid]);
        return data;
    },
    group: function () {
        for (var i = 0; i < this.tree.length; i++) {
            if (this.groups[this.tree[i].pId]) {
                this.groups[this.tree[i].pId].push(this.tree[i]);
            } else {
                this.groups[this.tree[i].pId] = [];
                this.groups[this.tree[i].pId].push(this.tree[i]);
            }
        }
    },
    getData: function (info) { //输入直接父集的id去递归查找 返回每次查找的结果
        if (!info) return;

        var children = [];
        for (var i = 0; i < info.length; i++) {
            var item = info[i];
            item.children = item['children'].concat(this.getData(this.groups[item.id]));
            children.push(item);
        }

        return children;
    }
};
/**
 * eg:
 *      var aaa = [
 {name: "111", id: 1, pId: 0, children: []},
 {name: "222", id: 6, pId: 0, children: []},
 {name: "b", id: 2, pId: 1, children: []},
 {name: "c", id: 3, pId: 1, children: []},
 {name: "d", id: 4, pId: 2, children: []},
 {name: "d", id: 4, pId: 6, children: []},
 ];
 var d = new ResetDataFormat2(aaa).init(0);
 console.log(d);
 * */

/** ==================== promise封装 ==================== */
    // 自封装promis start ie9不兼容  手机端没有问题
var RESOLVED = 0,
    REJECTED = 1,
    PENDING = 2;

function nextTick (cb) {
    setTimeout(cb, 100);
}

function _Promise (executor) {
    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];
    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

_Promise.reject = function (r) {
    return new _Promise(function (resolve, reject) {
        reject(r);
    });
};

_Promise.resolve = function (x) {
    return new _Promise(function (resolve, reject) {
        resolve(x);
    });
};

_Promise.all = function all (iterable) {
    return new _Promise(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver (i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (let i = 0; i < iterable.length; i += 1) {
            _Promise.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

_Promise.race = function race (iterable) {
    return new _Promise(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            _Promise.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p = _Promise.prototype;
p.resolve = function resolve (x) {
    let promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('_Promise settled with itself.');
        }

        let called = false;

        try {
            let then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p.reject = function reject (reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('_Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p.notify = function notify () {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            // resolve(onResolved.call(undefined, promise.value)); /* unnecessary '.call()' */
                            resolve(onResolved(promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            // resolve(onRejected.call(undefined, promise.value));  /* unnecessary '.call()' */
                            resolve(onRejected(promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p.then = function then (onResolved, onRejected) {
    var promise = this;

    return new _Promise(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};
// 自封装promis end

/** ==================== 观察都模式  单一事件管理 ==================== */
/**
 * eg:
 *   1，先临监听事件
 *      Event.on('eventName', function (result) { // 回调 });
 *   2，在触发事件
 *      Event.emit('eventName', { data: 发送的数据1, data2: 发送的数据2 }); data就是发送出去的数据
 * */
var Event = {
    // 通过on接口监听事件eventName
    // 如果事件eventName被触发，则执行callback回调函数
    on: function (eventName, callback) {
        if (!this.handles) {
            Object.defineProperty(this, "handles", {
                value: {},
                enumerable: false,
                configurable: true,
                writable: true
            });
        }
        if (!this.handles[eventName]) {
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(callback);
    },
// 触发事件 eventName
    emit: function () {
        if (this.handles[arguments[0]]) {
            this.data[arguments[0]] = arguments[1];
            for (var i = 0; i < this.handles[arguments[0]].length; i++) {
                this.handles[arguments[0]][i](arguments[1]);
            }
        }
    },
    data: {}
}

/** ==================== 交互 ajax  jsonp ==================== */
// {a:12, b:5} 转换成 a=12&b=5  把json转成字符串
function json2url (json) {
    var arr = [];
    for (var key in json) {
        arr.push(key + '=' + encodeURIComponent(json[key]));
    }
    return arr.join('&');
}

// 原生ajax封装
function ajax (json) { // 依赖json2url 函数
    json = json || {};
    if (!json.url) return;
    json.data = json.data || {};
    json.type = json.type || 'get';
    json.data.t = Math.random();
    if (window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest();
    } else {
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    switch (json.type.toLowerCase()) {
        case 'get':
            oAjax.open('GET', json.url + '?' + json2url(json.data), true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST', json.url, true);
            oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
        default:
            oAjax.open('GET', json.url + '?' + json2url(json.data), true);
            oAjax.send();
            break;
    }
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState === 4) {
            if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status === 304) {
                json.success && json.success(oAjax.responseText);
            } else {
                json.error && json.error(oAjax.status);
            }
        }
    };
}

// 原生ajax封装
const MAjax = (options) =
>
{
    /**
     * eg:
     *  MAjax({
     *      url: '',
     *      data:{},
     *      type: 'POST',
     *      beforeSend: function (res, setHeader) { // 设置头部
     *          // setHeader('Content-Type', 'application/octet-stream');
     *          // setHeader('Authorization', 'UpToken ' + token);
     *      },
     *      success: function (result) { // 成功回调
     *
     *      },
     *      error: function (error) { // 失败回调
     *
     *      }
     *  });
     * */
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = (options.dataType || 'text').toUpperCase();
    options.cache = options.cache || 'true ';
    options.timeout = parseInt(options.timeout) || 10000;

    // //添加ajax请求框
    // var _dom = document.getElementById('majax-loading');
    // if (!_dom) {
    //     this.creatAjaxLoading();
    // }

    // var params = formatParamsA(options.data);
    var params = options.data; // 需求问题对于参数暂不做处理
    var protocol = /^([\w-]+:)\/\//.test(options.url) ? RegExp.$1 : window.location.protocol;
    // var responseFields = {
    //     'XML': 'responseXML',
    //     'TEXT': 'responseText',
    //     'JSON': 'responseJSON'
    // };

    var headers = {};
    var setHeader = function (name, value) {
        headers[name.toLowerCase()] = [name, value];
    };

    var getHeader = function () {
        xhr.setRequestHeader = setHeader;
        for (let name in headers) {
            nativeSetHeader.apply(xhr, headers[name]);
        }
    };

    // 创建 - 非IE6 - 第一步
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else { // IE6及其以下版本浏览器
        xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    if (options.dataType !== 'TEXT') {
        try {
            xhr.responseType = options.dataType; // 'text'：返回类型为字符串，这是默认值。'arraybuffer'：返回类型为ArrayBuffer。'blob'：返回类型为Blob。'document'：返回类型为Document。'json'：返回类型为JSON object。
        } catch (e) {
            console.log('ajax不支持responseType');
        }
    }
    if (!options.cache) { // 禁用缓存
        xhr.setRequestHeader('If-Modified-Since', '0');
    }
    // 接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {  // 请求完成，响应就绪
            options.complete && options.complete.call(this, xhr); // 响应就发送
            // var result = xhr.responseType == "text" ? xhr.responseText : xhr.responseXML; //返回值类型
            // var result = xhr[responseFields[options.dataType]]; // 返回值类型
            var result = xhr.responseText;
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && protocol === 'file:') && typeof options.success === 'function') { // 成功
                var dataType = options.dataType || xhr.getResponseHeader('content-type');
                try {
                    if (dataType === 'SCRIPT') {
                        // (1, eval)(result);
                        // window.eval(result);
                        console.error('eval can be harmful! ', result);
                    } else if (dataType === 'XML') {
                        result = xhr.responseXML;
                    } else if (dataType === 'JSON') {
                        result = JSON.parse(result);
                    }
                } catch (e) {
                    console.log('error');
                }
                options.success && options.success(result, xhr.status);
            } else if (xhr.status >= 400 && xhr.status < 500) { // 客户端出错，404啊神马的
                options.error && options.error(xhr, xhr.status);
            } else if (xhr.status >= 500) { // 服务器端出错
                options.error && options.error(xhr, xhr.status);
            } else {
                options.error && options.error(xhr, xhr.status);
            }
        }
    };
    var nativeSetHeader = xhr.setRequestHeader;

    setHeader('Accept', '*/*');
    // 连接 和 发送 - 第二步
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true);
        options.beforeSend && options.beforeSend.call(this, options, setHeader);
        getHeader();
        xhr.send(null);
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true);
        // 设置表单提交时的内容类型
        setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        options.beforeSend && options.beforeSend.call(this, options, setHeader);
        getHeader();
        xhr.send(params);
    }
    // // 格式化参数
    // function formatParamsA(data) {
    //     var arr = [];
    //     for (var name in data) {
    //         arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    //     }
    //     arr.push(('v=' + Math.random()).replace('.'));
    //     return arr.join('&');
    // }
    //
    // function formatParamsB(obj) {
    //     var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    //     for (name in obj) {
    //         value = obj[name];
    //         if (value instanceof Array) {
    //             for (i = 0; i < value.length; ++i) {
    //                 subValue = value[i];
    //                 fullSubName = name + '[' + i + ']';
    //                 innerObj = {};
    //                 innerObj[fullSubName] = subValue;
    //                 query += param(innerObj) + '&';
    //             }
    //         }
    //         else if (value instanceof Object) {
    //             for (subName in value) {
    //                 subValue = value[subName];
    //                 fullSubName = name + '[' + subName + ']';
    //                 innerObj = {};
    //                 innerObj[fullSubName] = subValue;
    //                 query += param(innerObj) + '&';
    //             }
    //         }
    //         else if (value !== undefined && value !== null) {
    //             query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    //         }
    //
    //     }
    //     return query.length ? query.substr(0, query.length - 1) : query;
    // }
}
;

// 原生jsonp封装
function jsonp (json) { // 依赖 json2url函数
    json = json || {};
    //没有路径就不用往下走了
    if (!json.url) return;
    //默认给cb
    json.cbName = json.cbName || 'cb';
    //如果没有数据给个空对象
    json.data = json.data || {};

    //清除缓存   相当于是把json.cbName一起放入了data当中用于在下一步好合并成xx=xx&xx=xx&的形式
    json.data[json.cbName] = 'show' + Math.random();
    //在上一步中留下了个点  清除掉
    json.data[json.cbName] = json.data[json.cbName].replace('.', '');

    var oHead = document.getElementsByTagName('head')[0];
    var oS = document.createElement('script');
    oS.src = json.url + '?' + json2url(json.data);
    oHead.appendChild(oS);
    //回调函数必须是全局的
    window[json.data[json.cbName]] = function (res) {
        //数据已经拿到 可以把oS干掉了
        oHead.removeChild(oS);
        json.success && json.success(res);
    }

    /**
     * eg:
     *      window.onload=function(){
            jsonp({
                "url":"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                data:{ // 返回给后台的数据
                    "wd":"湖南"
                },
                cbName: 'cb', //默认是cb
                success:function(res){
                    console.log(res);
                }
            });
        }
     * */
}

/** ==================== 加减乘除 ==================== */
/**
 * 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * 调用：accAdd(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 **/
function accAdd (arg1, arg2) {
    var r1,
        r2,
        m,
        c;
    try {
        r1 = arg1.toString().split('.') [1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.') [1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', '')) * cm;
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm;
            arg2 = Number(arg2.toString().replace('.', ''));
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
}

/**
 * 减法函数，用来得到精确的减法结果
 * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 * 调用：accSub(arg1,arg2)
 * 返回值：arg1加上arg2的精确结果
 **/
function accSub (arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以 arg2的精确结果
 **/
function accMul (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * 除法函数，用来得到精确的除法结果
 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * 调用：accDiv(arg1,arg2)
 * 返回值：arg1除以arg2的精确结果
 **/
function accDiv (arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

/** ==================== 浏览器相关 ==================== */
// 获取?号后面或者#号后面的数据
function getQueryStringByName (name) {
    let mode = CONFIG.ROUTER_MODE === 'history' ? document.location.search : document.location.hash;
    var result = mode.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
    if (result === null || result.length < 1) {
        return '';
    }
    return result[1];
}

/** search拿的是？后面的数据   './a.html?a=12' */
function getRequestParameter (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);   //  要问号还是#号改这里就可以了search  hash
    if (r != null) return unescape(r[2]);
    return null;
}

// 获取地埴栏中的  地址路径
function getCurrentPath (opts) {
    // var rtn = document.location.hash;
    // if (opts && opts.pathOnly) {
    //     rtn = rtn.split('?')[0].replace(/#!\//g, '');
    // }
    // return rtn;
    return document.location.pathname;
}

// 判断是ios,pc,还是Android
function isIos () {
    var bSing = Boolean;
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        bSing = true;
        // alert('ios');
    } else if (/(Android)/i.test(navigator.userAgent)) {
        bSing = false;
        // alert('Android');
    } else {
        // alert('pc');
    }
    return bSing;
}

/** ==================== 各种正则 ==================== */
function validateEmail (val) {
    let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // (字母、数字、下划线、-、. )@(字母、数字、-)
    return re.test(val);
}

function validateTel (val) {
    let re = /^0\d{2,3}-?\d{7,8}$/; // 0开头2~3位区号，可以加-（也可不加），加上7~8位数字
    return re.test(val);
}

function validateMobile (val) {
    let re = /^1\d{10}$/; // 1开头的11位数字
    return re.test(val);
}

/**
 * 不允许输入特殊字符
 * */
function validateText (val) {
    let re = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
    return re.test(val);
}

/**
 * 输入手机号的校验
 * */
function validatePhone (val) {
    let re = /^0?1[3|4|5|7|8]\d{9}$/;
    return re.test(val);
}

/**
 * 输入身份证号的校验
 * */
function validateCard (val) {
    let re = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return re.test(val);
}

/** ==================== 是否是某一个东西 ==================== */
function isArray (val) {
    return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer (val) {
    return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData (val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView (val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
    } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString (val) {
    return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber (val) {
    return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined (val) {
    return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject (val) {
    return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate (val) {
    return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile (val) {
    return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob (val) {
    return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction (val) {
    return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream (val) {
    return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams (val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim (str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv () {
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return false;
    }
    return (
        typeof window !== 'undefined' &&
        typeof document !== 'undefined'
    );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach (obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }

    if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge (/* obj1, obj2, obj3, ... */) {
    var result = {};

    function assignValue (val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
            result[key] = merge(result[key], val);
        } else {
            result[key] = val;
        }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend (a, b, thisArg) {
    forEach(b, function assignValue (val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}

function bind (fn, thisArg) {
    return function wrap () {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
}



















