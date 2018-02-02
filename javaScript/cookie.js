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