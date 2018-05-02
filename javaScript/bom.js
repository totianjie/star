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
