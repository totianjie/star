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

    var res = decodeURI(window.location.search);
    var r = res.substr(1).match(reg);   //  要问号还是#号改这里就可以了search  hash
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
// 判断浏览器
function myBrowser () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        // var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
        var isIE = IETester(); // 不传参数返回当前IE版本，如果不是IE内核浏览器，返回false
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Safari浏览器

        if (isIE) {
            return 'IE' + isIE;
            /*var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = IE10 = IE11 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE55 = fIEVersion == 5.5;
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            IE8 = fIEVersion == 8.0;
            IE9 = fIEVersion == 9.0;
            IE10 = fIEVersion == 10.0;
            IE11 = fIEVersion == 11.0;

            // alert(fIEVersion);
            if (IE55) {
                return "IE55";
            }
            if (IE6) {
                return "IE6";
            }
            if (IE7) {
                return "IE7";
            }
            if (IE8) {
                return "IE8";
            }
            if (IE9) {
                return "IE9";
            }
            if (IE10) {
                return "IE10";
            }
            if (IE11) {
                return "IE11";
            }*/
        }//isIE end
        if (isFF) {
            return "FF";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isChrome) {
            return 'Chrome';
        }

        function IETester (userAgent) {
            var UA = userAgent || navigator.userAgent;
            if (/msie/i.test(UA)) {
                return UA.match(/msie (\d+\.\d+)/i)[1];
            } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
                return UA.match(/rv:(\d+\.\d+)/)[1];
            }
            return false;
        }

    }

// 详细浏览器信息
var client = function () {
        //呈现引擎
        var engine = {
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,
            //完整的版本号
            ver: null
        };
        //浏览器
        var browser = {
            //主要浏览器
            ie: 0,
            firefox: 0,
            safari: 0,
            konq: 0,
            opera: 0,
            chrome: 0,
            //具体的版本号
            ver: null
        };
        //平台、设备和操作系统
        var system = {
            win: false,
            mac: false,
            x11: false,
            //移动设备
            iphone: false,
            ipod: false,
            ipad: false,
            ios: false,
            android: false,
            nokiaN: false,
            winMobile: false,
            //游戏系统
            wii: false,
            ps: false
        };
        //检测呈现引擎和浏览器
        var ua = navigator.userAgent;
        var isIE = IETester(ua);
        if (window.opera) {
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        } else if (/AppleWebKit\/(\S+)/.test(ua)) {
            engine.ver = RegExp["$1"];
            engine.webkit = parseFloat(engine.ver);
            //确定是Chrome 还是Safari
            if (/Chrome\/(\S+)/.test(ua)) {
                browser.ver = RegExp["$1"];
                browser.chrome = parseFloat(browser.ver);
            } else if (/Version\/(\S+)/.test(ua)) {
                browser.ver = RegExp["$1"];
                browser.safari = parseFloat(browser.ver);
            } else {
                //近似地确定版本号
                var safariVersion = 1;
                if (engine.webkit < 100) {
                    safariVersion = 1;
                } else if (engine.webkit < 312) {
                    safariVersion = 1.2;
                } else if (engine.webkit < 412) {
                    safariVersion = 1.3;
                } else {
                    safariVersion = 2;
                }
                browser.safari = browser.ver = safariVersion;
            }
        } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp["$1"];
            engine.khtml = browser.konq = parseFloat(engine.ver);
        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
            engine.ver = RegExp["$1"];
            engine.gecko = parseFloat(engine.ver);
            //确定是不是Firefox
            if (/Firefox\/(\S+)/.test(ua)) {
                browser.ver = RegExp["$1"];
                browser.firefox = parseFloat(browser.ver);
            }
        } else if (isIE) {
            engine.ver = browser.ver = isIE;
            engine.ie = browser.ie = parseFloat(engine.ver);
            console.log(engine.ie);
        } else if (/MSIE ([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp["$1"];
            engine.ie = browser.ie = parseFloat(engine.ver);
        }

        function IETester (userAgent) {
            var UA = userAgent || navigator.userAgent;
            if (/msie/i.test(UA)) {
                return UA.match(/msie (\d+\.\d+)/i)[1];
            } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
                return UA.match(/rv:(\d+\.\d+)/)[1];
            }
            return false;
        }

        //检测浏览器
        browser.ie = engine.ie;
        browser.opera = engine.opera;
        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

        //检测Windows 操作系统
        if (system.win) {
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                if (RegExp["$1"] == "NT") {
                    switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                    }
                } else if (RegExp["$1"] == "9x") {
                    system.win = "ME";
                } else {
                    system.win = RegExp["$1"];
                }
            }
        }


        //移动设备
        system.iphone = ua.indexOf("iPhone") > -1;
        system.ipod = ua.indexOf("iPod") > -1;
        system.ipad = ua.indexOf("iPad") > -1;
        system.nokiaN = ua.indexOf("NokiaN") > -1;
        //windows mobile
        if (system.win == "CE") {
            system.winMobile = system.win;
        } else if (system.win == "Ph") {
            if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
                system.win = "Phone";
                system.winMobile = parseFloat(RegExp["$1"]);
            }
        }

        //检测iOS 版本
        if (system.mac && ua.indexOf("Mobile") > -1) {
            if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
                system.ios = parseFloat(RegExp.$1.replace("_", "."));
            } else {
                system.ios = 2; //不能真正检测出来，所以只能猜测
            }
        }

        //检测Android 版本
        if (/Android (\d+\.\d+)/.test(ua)) {
            system.android = parseFloat(RegExp.$1);
        }

        //游戏系统
        system.wii = ua.indexOf("Wii") > -1;
        system.ps = /playstation/i.test(ua);

        //返回这些对象
        return {
            engine: engine,
            browser: browser,
            system: system
        };
    }();
