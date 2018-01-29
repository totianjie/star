> #### 打电话

```html
<!--在移动页面拨打电话-->
  <a href="tel:400-888-6633" style="margin-top: 20px; display: block;">拨打电话</a><br>
```

> #### 发送短信

```html
<!--发送短信-->
  <a href="sms:19956321564" style="margin-top: 20px; display: block;">发送短信</a><br>
<!-- 带内容 -->
  <a href="sms:15162542562?body=你好，我要预定！" style="margin-top: 20px; display: block;">短信下单</a><br>
```

```
原理：利用a标签跳转指定网址：
    sms://[号码]?body=[内容] //安卓
    sms://[号码]&body=[内容] //IOS
```

```html
eg: 
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="UTF-8">
<title>发送短信</title>
</head>
<body>
<form action="#">
    <input  id="name" type="text">
    <input  id="tel" type="text">
    <a href="#">发送短信</a>
</form>
<script>
  function doAction(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    //android终端
    var isiOS = !!u.match(/\(i{FNXX==XXFN}+;( U;)? CPU.+Mac OS X/); //ios终端
    var name =document.getElementById('name').value;
    var tel= document.getElementById('tel').value;
    if(isiOS){
      document.getElementsByTagName('a')[0].href="sms://"+tel+"?body="+name;}
    else{
      document.getElementsByTagName('a')[0].href="sms://"+tel+"&body="+name;}

  }
</script>
</body>
</html>

```

``然后再input标签添加一个oninput时间来触发doAction()就可以了。``

> #### 发送邮件

~~~html
<a href="mailto:mail@mail.com" style="margin-top: 20px; display: block;">发送邮件</a>
<!--mail@mail.com是邮箱-->
~~~

> #### 附件下载

```html
<a href="http://budget.xincheng.com:20000/nets-budget/sys_file/download?id=2158" target="_blank">附件1---点击下载</a>

<!--http://budget.xincheng.com:20000/nets-budget/sys_file/download?id=2158" 是后台给的地址   一般都是请求来的-->
```

~~~javascript
// 附件下载第二种 方法  其实也是通过a标签的方法
function downloadFile(fileName, content){
  // 1  先创建一个a标签 
    var aLink = document.createElement('a');
  // 创建一个blod对象  用于存储着大量的二进制数据
    var blob = new Blob([content]);
  // 创建一个事件
    var evt = document.createEvent("HTMLEvents");
  // 初始化事件 是一个点击事件   是否冒泡   是否有默认行为
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
  
  // 给a标签 的download属性   可以不给  不给的话就默认取文件的名字
    aLink.download = fileName;
  // 把文件地址赋值给a标签 
    aLink.href = URL.createObjectURL(blob);
  // a标签自动触发点击事件
    aLink.dispatchEvent(evt);
}


原理如下
<a href="file" download='fileName'>点击下载</a>

file就是下载的东西通过blob转换成href可识别的
fileName就是下载文件的名字  可以给空  给空的话就默认是文件当前的名字
上面的evt其实就是给a标签自动触发了一下点击事件
~~~

