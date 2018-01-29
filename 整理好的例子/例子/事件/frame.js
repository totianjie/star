/**
 * Created by tianjie on 2016/12/21.
 */
//获取非行问样式
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}
//去重
function findInArr(item,arr){
    for(var i=0; i<arr.length; i++){
        if(arr[i]==item){
            return true;
        }
    }
    return false;
}
//获取  class
function getByClass(obj,sClass){
    if(obj.getElementsByClassName){//IE9+ chrome FF
        return obj.getElementsByClassName(sClass);
    }else{
        var aEle=obj.getElementsByTagName('*');
        var arr=[];
        for(var i=0; i<aEle.length; i++){
            var aClass=aEle[i].className.split(' ');
            if(findInArr(sClass,aClass)){
                arr.push(aEle[i])
            }
        }
        return arr;
    }
}
//数组里找最小值
function findMin(arr,start){
    var count=arr[start];
    for(var i=start+1; i<arr.length; i++){
        if(arr[i]<count){
            count=arr[i];
        }
    }
    return count;
}

//下一个兄弟切点^~^obj 同级的
function nextSibling(obj){
    if(obj.nextElementSibling){
        return obj.nextElementSibling;
    }else{
        return obj.nextSibling;
    }
}
// var oNext=nextSibling(oLi);

//上一个兄弟节点  obj是同级的
function previousSibling(obj){
    return obj.previousElementSibling || obj.previousSibling;
}

//首节点   这里的obj是父级
function firstChild(obj){
    return obj.firstElementChild || obj.firstChild;
}
//尾节点
function lastChild(obj){
    return obj.lastElementChild || obj.lastChild;
}

//获取绝对位置
function getPos(obj){
    var l=0;
    var t=0;
    while(obj){
        l+=obj.offsetLeft;
        t+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return {left:l, top:t};
}

//事件绑定  同一元素 同一事件 执行不同的函数
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        //IE9+ chrome  FF
        obj.addEventListener(sEv,fn,false)
    }else{
        //IE10 9 8 7..
        obj.attachEvent('on'+sEv,fn);
    }
}
//解绑定   解绑定后就什么都不执行了   相当于就没有了
function removeEvent(obj,sEv,fn){
    if(obj.addEventListener){
        //IE9+ chrome FF
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.detachEvent('on'+sEv,fn);
    }
}
//滚轮事件 里面加了事件绑定
function addWheel(obj,fn){
    function wheel(ev){
        var oEvent=ev || event;
        var dDown=true;

        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta<0){
                dDown=true;
            }else{
                dDown=false;
            }
        }else{
            if(oEvent.detail<0){
                dDown=false;
            }else{
                dDown=true;
            }
        }
        //把方向返回出去
        fn(dDown);
        //判断有没有有就执行
        oEvent.preventDefault && oEvent.preventDefault();//阻止默认行为return false 碰到事件绑定就失效了所以用这个  解决兼容高级浏览器
        return false;
    }
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        obj.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        obj.onmousewheel=wheel;
    }
}