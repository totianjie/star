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
const MAjax = function (options) {
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
};

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

//
{
    function AJAX () {
        "use strict";

        function _all_func () {
        }

        _all_func.prototype = {
            //get请尔封装，五个参数分别的请求地址，请求数据，成功回调，错误回调，及contentType（该参数如非特别需要可自动处理）
            get: function (url, suc, data, err, cy) {
                this.ajax(0, url, suc, err, data, cy);
            },
            //同get请尔
            post: function (url, suc, data, err, cy) {
                this.ajax(1, url, suc, err, data, cy);
            },
            //自定义ajax,met可取值为0-3分别为"GET", "POST", "PUT", "DELETE"
            ajax: function (met, url, suc, data, err, cy) {
                var that = this;
                met = parseInt(met, 10);
                met = isNaN(met) ? 0 : met > 3 ? 3 : met < 0 ? 0 : met;
                data = data ? data : null;
                var m = ["GET", "POST", "PUT", "DELETE"];
                cy = cy ? cy : "application/x-www-form-urlencoded; charset=UTF-8";
                if (met > 0) {
                    if (data && (typeof (data) === "object" && typeof (data.append) === "function")) {
                        cy = false;
                    }
                    if (data && (typeof (data) === "string")) {
                        cy = 'application/json';
                    }
                }
                var f = function () {
                };
                err = err ? err : f;
                suc = suc ? suc : f;
                that.myAjax({
                    type: m[met],
                    url: url,
                    contentType: cy,
                    data: data,
                    cache: false,
                    error: function (d) {
                        err(d);
                    },
                    success: function (d) {
                        var ks = true;
                        try {
                            d = JSON.parse(d);
                        } catch (e) {
                            ks = false;
                            suc(d);
                        }
                        if (ks) {
                            suc(d);
                        }

                    }
                });

            },
            myAjax: function (o) {
                console.log(o);
                o = ext({
                        url: '',
                        type: "GET", //请求方式
                        data: false, //请求数据
                        dataType: 'JSON', //数据类型
                        cache: false,
                        contentType: false,
                        timeout: 0, //超时
                        withCredentials: false, //跨域带数据
                        success: function () {
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    },
                    o || {});

                function ext (a, b) {
                    for (var k in b) {
                        if (b.hasOwnProperty(k)) {
                            a[k] = b[k];
                        }
                    }
                    return a;
                }

                function obj (b) {
                    var temp = '';
                    for (var i in b) {
                        if (b.hasOwnProperty(i)) {
                            temp += i + '=' + encodeURIComponent(b[i]) + '&';
                        }
                    }
                    return temp.slice(0, -1);
                }

                function AjaxMy (o) {
                    //回调函数
                    function onreadystatechange (func, _xhr) {
                        _xhr.onreadystatechange = function () {
                            if (_xhr.readyState === 4) {
                                try {
                                    if (_xhr.status >= 200 && _xhr.status < 300) {
                                        var R_t = _xhr.responseText;
                                        if (o.dataType.toUpperCase() === "JSON") {
                                            try {
                                                R_t = JSON.parse(R_t);
                                            } catch (e) {
                                            }

                                        }
                                        func(R_t);
                                    } else {
                                        setTimeout(function () {
                                                if (func_ks) {
                                                    o.error.call(this, _xhr.status);
                                                }
                                            },
                                            50);
                                    }
                                } catch (e) {
                                    setTimeout(function () {
                                            if (func_ks) {
                                                o.error.call(this, e);
                                            }
                                        },
                                        50);
                                }
                                xhr = null;
                            }
                        };
                    }

                    //判断是否同域
                    function dma (url) {
                        if (/^\//.exec(url)) {
                            return true;
                        }
                        if (url.search(window.location.host) > -1) {
                            var s = window.location.port ? window.location.port : '8080';
                            var s2 = /https?:\/\/[^:]+:(\d+)/.exec(url);
                            s2 = s2 ? s2[1] : '8080';
                            return s === s2 ? true : false;
                        } else {
                            return false;
                        }
                    }

                    var xhr = new XMLHttpRequest();
                    var func_ks = true;
                    o.data = o.data ? o.data : false;
                    o.type = o.type.toUpperCase();
                    var rts = /([?&])_=[^&]*/,
                        ajax_rquery = /\?/;
                    if (o.type === "GET") {
                        if (o.data) {
                            if (typeof (o.data) === 'object') {
                                o.data = obj(o.data);
                            }
                            o.url = rts.test(o.url) ? o.url.replace(rts, "$1" + o.data) : o.url + (ajax_rquery.test(o.url) ? "&" : "?") + o.data;
                        }
                        o.data = null;
                        if (!o.cache) {
                            var this_t = new Date().getTime();
                            o.url = rts.test(o.url) ? o.url.replace(rts, "$1_=" + this_t) : o.url + (ajax_rquery.test(o.url) ? "&" : "?") + "_=" + this_t;
                        }

                    }
                    //跨域带数据
                    var is_dma = dma(o.url);
                    if (o.withCredentials && !is_dma) {
                        xhr.withCredentials = true;
                    }
                    xhr.open(o.type, o.url, true);
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("mimeType");
                    }
                    if (is_dma) {
                        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    }
                    var settime = parseInt(o.timeout, 10);
                    //超时判断
                    if (settime && settime > 0) {
                        xhr.timeout = settime;
                        if (xhr.timeout !== "undefined") {
                            xhr.timeout = o.timeout;
                            func_ks = false;
                            xhr.ontimeout = function () {
                                o.error.call(this, "timeout");
                            };
                        } else {
                            console.log("不支持超时设置");
                        }
                    }

                    if (o.contentType) {
                        //setRequestHeader 一个都不设置跨域时就不会出现options请求
                        //X-requested-with 显示的告诉服务端是异步
                        if (!is_dma) {
                            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                        }

                        xhr.setRequestHeader('Content-Type', o.contentType);

                        if (o.data) {
                            o.data = typeof (o.data) === "string" ? o.data : obj(o.data);
                        }

                    }

                    onreadystatechange(o.success, xhr);
                    xhr.send(o.data);

                }

                new AjaxMy(o);
            }

        };
        return new _all_func();
    }

    var T = new AJAX();
    var k = new FormData();
    k.append("aa", 123);

    T.post('ajax.html', function (d) {
        console.log(d);
    }, k);
}