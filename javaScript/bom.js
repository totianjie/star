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