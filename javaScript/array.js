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

// 数组乱序
/**
 var array = [1, 2, 3, 4, 5];
 console.log(array.sort(compare));//[2,1,5,4,3]
 * */
function compare () {
    return Math.random() - 0.5; // 每次返回一个随机数让数组乱序
}

// ------------------------------------------------------------------
// 随机整数
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 数组乱序
function shuffle (arr) {
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i);
        let t = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = t;
    }
    return _arr;
}

// ------------------------------------------------------------------
// 处理数组上兼容问题

// every()：对数组中的每一项运行给定函数，如果每一项都返回true，则返回true，否则false；
if (typeof Array.prototype.every != "function") {
    Array.prototype.every = function (fn, context) {
        var passed = true;
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                if (passed === false) break;
                passed = !!fn.call(context, this[k], k, this);
            }
        }
        return passed;
    };
}
// some()：对数组中的每一项运行给定函数，如果至少有一项返回true，则返回true，否则false；
if (typeof Array.prototype.some != "function") {
    Array.prototype.some = function (fn, context) {
        var passed = false;
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                if (passed === true) break;
                passed = !!fn.call(context, this[k], k, this);
            }
        }
        return passed;
    };
}
// filter()：对数组中的每一项给定函数，返回值为true的项重新组成新的数组；
if (typeof Array.prototype.filter != "function") {
    Array.prototype.filter = function (fn, context) {
        var arr = [];
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                fn.call(context, this[k], k, this) && arr.push(this[k]);
            }
        }
        return arr;
    };
}
// map()：岁数组中的每一项给定函数，返回每一项调用这个函数的结果；
// map()方法还可以接受第二个参数，表示回调函数执行时this所指向的对象
/*var arr = ['a','b','c'];
[1,2].map(function(item,index,arr){return this[item]},arr);//['b','c']*/
//map()方法兼容写法
if (typeof Array.prototype.map != "function") {
    Array.prototype.map = function (fn, context) {
        var arr = [];
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                arr.push(fn.call(context, this[k], k, this));
            }
        }
        return arr;
    };
}
// forEach()：对方法中的每一项运行给定函数。这个方法没有返回值；
if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function (fn, context) {
        for (var k = 0, length = this.length; k < length; k++) {
            if (typeof fn === 'function' && Object.prototype.hasOwnProperty.call(this, k)) {
                fn.call(context, this[k], k, this);
            }
        }
    }
}
// reduce()方法兼容写法
/**
 var nums=[1,2,3,4,5];
 var sum=nums.reduce(function(prev,cur,index,array){
        return prev+cur;
    });
 alert(sum);      //15     第一次 prev:1;cur:2; 第二次： prev:3(1+2)  cur:3  以此类推
 * */
if (typeof Array.prototype.reduce != "function") {
    Array.prototype.reduce = function (callback, initialValue) {
        var previous = initialValue, k = 0, length = this.length;
        if (typeof initialValue === "undefined") {
            previous = this[0];
            k = 1;
        }
        if (typeof callback === "function") {
            for (k; k < length; k++) {
                this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
            }
        }
        return previous;
    };
}

// reduceRight()方法兼容写法
/**
 var nums=[1,2,3,4,5];
 var sum=nums.reduceRight(function(prev,cur,index,array){
        return prev+cur;
    });
 alert(sum);      //15     第一次 prev:5;cur:4; 第二次： prev:9(5+4)  cur:3  以此类推
 * */
if (typeof Array.prototype.reduceRight != "function") {
    Array.prototype.reduceRight = function (callback, initialValue) {
        var length = this.length, k = length - 1, previous = initialValue;
        if (typeof initialValue === "undefined") {
            previous = this[length - 1];
            k--;
        }
        if (typeof callback === "function") {
            for (k; k > -1; k -= 1) {
                this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
            }
        }
        return previous;
    };
}
//　indexOf()方法兼容写法
/**
 // indexOf()   第一个参数是查找的东西  第二个参数是从哪里开始找起
 [1,2,3,4,5].indexOf(2); //返回的是   1  没有就返回 -1
 * */
if (typeof Array.prototype.indexOf != "function") {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var index = -1;
        fromIndex = fromIndex * 1 || 0;
        for (var k = 0, length = this.length; k < length; k++) {
            if (k >= fromIndex && this[k] === searchElement) {
                index = k;
                break;
            }
        }
        return index;
    };
}