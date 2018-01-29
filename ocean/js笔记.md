> ##### url？后面的的参数

```javascript
// 比如一个URL是XXXX?g=1,那么document.location.search的值就是?g=1
document.location.search
```
> ##### url # 号后面的参数

```javascript
// hash 属性是一个可读可写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分）
documnt.location.hash
```
> ##### 关于浏览器流动条滚动的距离

~~~javascript
/*pageXOffset 和 pageYOffset 属性相等于 scrollX 和 scrollY 属性。*/

window.scrollBy(100, 100); //滚动条left,top各移动100
window.pageXOffset; // x方向滚动条滚动的距离   支持高级浏览器 ie9+
window.pageYoffset; // y方向滚动条滚动的距离   支持高级浏览器 ie9+

// IE 8 及 更早 IE 版本不支持该属性,但可以使用 
// document.documentElement.scrollLeft 和 
// document.documentElement.scrollTop 属性 


/**
	网页可见区域宽： document.body.clientWidth;
    网页可见区域高： document.body.clientHeight;
    网页可见区域宽： document.body.offsetWidth    (包括边线的宽);
    网页可见区域高： document.body.offsetHeight   (包括边线的宽);
    网页正文全文宽： document.body.scrollWidth;
    网页正文全文高： document.body.scrollHeight;
    网页被卷去的高： document.body.scrollTop;
    网页被卷去的左： document.body.scrollLeft;
    网页正文部分上： window.screenTop;
    网页正文部分左： window.screenLeft;
    屏幕分辨率的高： window.screen.height;
    屏幕分辨率的宽： window.screen.width;
    屏幕可用工作区高度： window.screen.availHeight;
    屏幕可用工作区宽度：window.screen.availWidth;


    scrollHeight: 获取对象的滚动高度。  
    scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
    scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
    scrollWidth:获取对象的滚动宽度
    offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
    offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置
    offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置  
    event.clientX 相对文档的水平座标
    event.clientY 相对文档的垂直座标

    event.offsetX 相对容器的水平坐标
    event.offsetY 相对容器的垂直坐标  
    document.documentElement.scrollTop 垂直方向滚动的值
    event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量
    要获取当前页面的滚动条纵坐标位置，用：
    document.documentElement.scrollTop;
    而不是：
    document.body.scrollTop;
    documentElement 对应的是 html 标签，而 body 对应的是 body 标签
*/

~~~

