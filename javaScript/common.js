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

// 截留方法 ==> 应用在vue中的watch中比较好
function debounce (func, delay) {
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            func.apply(this, args);
        }, delay);
    };
}

/*
    inputChange: function () {
        clearTimeout(this.timeoutId);
        var _this = this;
        this.timeoutId = setTimeout(function () {
            _this._init();
        }, 200);
    },
* */

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

/** ==================== 是否是某一个东西 ==================== */
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



















