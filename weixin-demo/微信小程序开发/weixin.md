> # 微信小程序

官网：https://mp.weixin.qq.com/

1，先注册小程序帐号

2，下载开发者工具

3，下载源码（有目录结构）https://mp.weixin.qq.com/debug/wxadoc/dev/index.html?t=20171016

​	pages-|   --------》全部的页面

​		index-|

​			index.js--》对js

​			index.wxss--》对应css

​			index.wxml--》对应html	

​		logs-|

​			logs.js

​			logs.wcss

​			logs.wxml

​	utils-|   --------》公共函数

​		util.js

​	app.js    // 整个小程序的公共js

​	app.json //  整个小程序的公共

​	app.wxss  // 整个小程序的公共css



调工具appData  里面显示的是Page里面data的所有数据

​	Page({

​		data:{}

​	})

> #### 新建页面

~~~
鼠标在pages上点击右键--》新建--》目录   比如目录名就是test

新建目录后鼠标在目录名上点击右键新建Page 比如名就叫test  
	目录下就会自动新建test.wxml,test.js,test.wxss,test.json

~~~



> #### 页面跳转

~~~javascript
1，直接加标签跳转   自动会找../news目录下的news.wxml文件
  <navigator url="../news/news"></navigator>

2，通过事件跳转
  <button bindtap="aaa">跳转到news页面</button>  // aaa 目前还不可以传参  会报错
  // 在js里面添加一个aaa的方法
    aaa () {
      console.log('跳到news页面');
      wx.navigateTo({
        url: '../news/news',
      })
  },
~~~



> #### 添加事件

~~~javascript
// 所有事件都是用   bind

// 点击事件
bindtap="aaa"  // aaa是函数
// input输入是触发input事件
bindinput="aaa"  // aaa是函数
// change事件
bindchange="aaa"  // aaa是函数

// 获取input上的value可以使用
<input type="text" size="mini" bindinput="inputChange"></input>
  inputChange (ev) {
    console.log(ev);
    // 在ev上有一个detail   detail身上有个value   就是当前input的value值
    this.setData({
      inputValue: ev.detail.value
    });
    console.log(this.data.inputValue);
  }

// 获取自定义属性可以使用
// arr:[{msg: 'abc'},{msg: 'aaa'},....]
<view class="item" wx:for="{{arr}}" wx:key="index">
  	<text class="text">{{item.msg}}</text>
	<icon class="close-btn" data-index="{{index}}" type="cancel" bindtap="delete"></icon>
</view>

  delete (ev) {
    // 在ev.target 身上有个dataset 就是用来获取自定义属性的，是一个json 
    // 如果自定义属性是   data-index   获取方式就是ev.target.dataset.index
    // 如果自定义属性是   data-abc     获取方式就是ev.target.dataset.abc
    console.log(ev.target.dataset);
    console.log('点击删除');
  }
	
~~~

> #### 定义数据和使用数据和修改数据

~~~javascript
// 定义数据
在pages/user/user.js中
Page({
  data: {
    msg: 124
  },
  // 修改数据   change是一个函数   用bindtap触发改变数据
  change () {
    // this.data 就是Page里的data
    // 改变数据 
    //this.data.motto = 'abc'; // 这样改是不行的 X
    
    this.setData({  // 要这样改
      msg: '数据被修改了'
    });
  }
});
// 使用数据
在pages/user/user.wxml中
<text>{{msg}}</text>
~~~



> #### 获取全局数据

~~~
app.js
	app({}) 注册一个小程序

pages下面页面想要获取app.js里面的数据就是 
	const app = getApp(); // 获取app.js里面的所有东西
	console.log(app);
~~~

> #### 改变每个页面的头部样式

~~~javascript
app.json里面配制的是全局的样式
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs",
    "pages/news/news"
  ],
  "window": {
    "backgroundTextStyle": "light",  // 背景
    "navigationBarBackgroundColor": "#fff", // 字体颜色
    "navigationBarTitleText": "我的项目",	// 字体
    "navigationBarTextStyle": "black"  // 字体样式
  }
}

单独页面配制
	eg: pages/news/news.json
	{
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "我是新闻页面",
      "navigationBarTextStyle": "#000000"  
  	}
//颜色最好不要用简写  比如#000   最好写成 #000000
// 也不要用  red   black  这样的英文单词   因为有的时候在手机上会识别不出来
~~~

> #### 支持模块化

~~~javascript
eg: utils/

导出模块：
	module.exports.x = x; // 导出多个
	module.exports = {};  // 导出多个
	exports.x = x;   	// 导出的是单个
	
使用：
	let com = require(模块路径);
	
eg:
	utils目录下新建common.js
    common.js中定义导出模块
      function echoHello (user) {
        return `欢迎用户：${user}`;
      }
      function echoBye (user) {
        return `欢迎 ${user} 下次在来`;
      }
      module.exports.echoHello = echoHello;
      module.exports.echoBye = echoBye;	

	在pages/user/user.js中引入模块使用
	let com = require('../../utils/common');
	
	调用
    	com.echoHello('小明');
		com.echoBye('小明');

~~~

> #### 标签

~~~~
view   就是div
text   就是文字
~~~~

> ####循环和判断

~~~html
wx:if="{{bShow}}"
  <view class="box">
    <button type="default" size="mini">切换</button>
    <view class="item" wx:if="{{bShow}}"></view>
  </view
wx:for="{{arr}}" wx:key="index"
    <view class="listview">
    	<view class="li" wx:for="{{arr}}" wx:key="index">
          {{item}}
          {{index}}
    </view>
	</view>

~~~

> #### 本地存储

~~~javascript
	// 下面都是异步的还有同步的  
	wx.setStorage({
      key: 'arr',
      data: this.data.arr,
      success (res) {
        console.log('异步保存成功',res);
      }
    });
    wx.getStorage({
      key: 'arr',
      success (res) {
        console.log('异步获取成功',res);
      }
    });
    wx.removeStorage({
      'key': 'arr',
      success (res) {
        console.log('删除成功',res);
      }
    });
    wx.clearStorage({
      success (res) {
        console.log('全部清除成功',res);
      }
    });
    wx.getStorageInfo({
      success(res) {
        console.log('获取本地缓存信息成功',res);
      }
    });
~~~







~~~
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
~~~

