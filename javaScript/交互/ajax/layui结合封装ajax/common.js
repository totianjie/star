layui.define(['jquery', 'layer'], function(exports){
	var $ = layui.jquery,
		  layer = layui.layer;
	// var originUrl = location.origin + '/general-organ-ui';//新增全局变量，用于前后端分离，以后只要动态设置一下这个值就可以了
	var originUrl = location.origin;//新增全局变量，用于前后端分离，以后只要动态设置一下这个值就可以了
	var orgId = getCookie('ORGID') || '';

	function setCookie(key, value, expiresHours,domainUrl) {	
	    var cookieString = key + "=" + value,
	          _durl=domainUrl ||".qitoon.com";
	    //判断是否设置过期时间
	    if (expiresHours) {
	        var date = new Date();
	        date.setTime(date.getTime + expiresHours * 3600 * 1000);
	        cookieString = cookieString + "; expires=" + date.toGMTString();
	    }
	    document.cookie = cookieString + ";path=/;domain="+_durl; 
	}
	
	
	function getCookie(key) {
	    var name = key + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	    }
	    return "";
	}
	
	
	function deleteCookie(key,domainUrl) {
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		var _durl=domainUrl ||".qitoon.com";
		document.cookie = key + "=''; expires=" + date.toGMTString()+ ";path=/;domain="+_durl;
	}
	
	function clearAllCookie(){
		var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
		if (keys) { 
			for (var i = keys.length; i--;) {
				document.cookie=keys[i]+'="";expires=' + new Date(0).toUTCString();
			}
		} 
	}
	
	//判断项目环境
	function judgeEnvi(url) {
		var str = 'http://';
		if( url.indexOf('t100')>0 ){
			str = 'http://t100';
		}else if( url.indexOf('t200')>0 ){
			str = 'http://t200';
		}else if( url.indexOf('p100')>0 ){
			str = 'http://p100';
		}
		return str;
	}



	function ajax(option) {
		var config = {
			type: "get",
			isFrame:false,
			url: "",
			timeout:50000,
			data: {},
			async: true,
			traditional: false,
			headers:null,//headers: {Accept: "application/json; charset=utf-8"}
						//headers: {"Accept": "application/json; charset=utf-8", "Content-Type":"application/json; charset=utf-8"}
			dataType: "json",
			success: null,
			successElse: null,
			complete: null,
		}
		var setting = $.extend(true, {}, config, option);
		$.ajax({
			type: setting.type,
			url: originUrl + setting.url,
			timeout:setting.timeout,
			data: setting.data,
			async: setting.async,
			headers: setting.headers,
			dataType: setting.dataType,
			traditional: setting.traditional,
			complete: setting.complete,
			success: function(data) {
                if(data.meta.code === "0") {
                    if(setting.success){
						setting.success(data);
					}
				} else if(data.meta.code === "-1") {
                    layer.open({
						title: '温馨提示',
						content: data.meta.message,
						btn: ['确定']
					});
				} else if(data.meta.code === "-2") {
					var myLayer = $(".layui-layer").get();
					if(!myLayer.length){
						layer.open({
							title: '温馨提示',
							content: '操作已超时，请重新登录',
							btn: ['确定'],
							yes: function() {
								var jumpUrl = judgeEnvi(location.origin) + 'console.qitoon.com';
								var postData = {
									ajaxType: "-2",
									jumpUrl: jumpUrl
								}
								top.postMessage(JSON.stringify(postData), jumpUrl);
							}
						});
					}
				} else if(data.meta.code == "-3") {
					layer.open({
						title: '温馨提示',
						content: '您的帐号已被登陆，请及时修改密码',
						btn: ['确定'],
						yes: function() {
							/*var jumpUrl = judgeEnvi(location.origin) + 'console.qitoon.com';
							var postData = {
								ajaxType: "-3",
								jumpUrl: jumpUrl
							}
							top.postMessage(JSON.stringify(postData), jumpUrl);//这些是看不懂的  可以跳到登录页就可以了*/
						}
					});
				} else {
					
				}
			},
			error: function(data) {
				layer.open({
					btn: ['确定'],
					title: '温馨提示',
					content:'网络错误，请联系管理员'
				});
			},
			complete : function(XMLHttpRequest,status){ 
				if(status == 'timeout'){
					layer.open({
						btn: ['确定'],
						title: '温馨提示',
						content:'请求超时，请检查您的网络'
					});
				}
				if(setting.complete){
					setting.complete();
				}
	　　    }
		});
	}
	var obj = {
		setCookie: setCookie,
		getCookie: getCookie,
		deleteCookie: deleteCookie,
		clearAllCookie: clearAllCookie,
		ajax: ajax,
		originUrl: originUrl,
		orgId: orgId,
		judgeEnvi: judgeEnvi
	};
	exports('common', obj);	
});

/**
	使用方式
	layui.define(['jquery', 'layer', 'common', 'form', 'upload','tree','laypage'], function(exports){
		var $ = layui.jquery,
			layer = layui.layer,
			common = layui.common;

		common.ajax({
			url:'/nets-authority/syswin/role_category/all',
			type:'get',
			data:{
				pageIndex:0,
				pageSize:10,
				sortField:'',
				sortOrder:''
			},
			success: function (res) {
				console.log(res);
			}
		});
	});
	
*/

//layer 配置简要说明
var laydomstr={
	type:1,//0,1,2,40（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
	title:'',//也可以传数组 ['文本', 'font-size:18px;']及false
	content:'',//可以是字符串，jquery dom对像，及地址
	skin: 'demo-class',//传样式
	area:'500px',//在默认状态下，layer是宽高都自适应的，但当你只想定义宽度时，你可以area: '500px'，高度仍然是自适应的。当你宽高都要定义时，你可以area: ['500px', '300px']
	offset: '100px',//当您top、left都要定义时，你可以offset: ['100px', '200px']
	btn: ['按钮1', '按钮2', '按钮3'],//按钮1 回调yes，而从按钮2开始，则回调为btn2: function(){}，以
	closeBtn:1,//可通过配置1和2来展示，如果不显示，则closeBtn: 0
	shade:[0.8, '#393D49'],//如果你不想显示遮罩，可以shade: 0
	time:5000,//代表5秒后自动关闭，注意单位是毫秒（1秒=1000毫秒）
	anim:0,//目前shift可支持的动画类型有0-6
	id:1,//设置该值后，不管是什么类型的层，都只允许同时弹出一个。一般用于页面层和iframe层模式
	maxmin:false,//默认不显示最大小化按钮。需要显示配置maxmin: true即可
	fix:true,//即鼠标滚动时，层是否固定在可视区域。如果不想，设置fix: false即可
	scrollbar:true,//默认允许浏览器滚动，如果设定scrollbar: false，则屏蔽
	maxWidth:500,//当area: 'auto'时，maxWidth的设定才有效。
	zIndex:1988,//一般用于解决和其它组件的层叠冲突。
	success:function(){},//success会携带两个参数，分别是当前层DOM当前层索引
	yes:function(){},//该回调携带两个参数，分别为当前层索引、当前层DOM对象。
	cancel:function(){},//该回调携带两个参数，分别为当前层索引、当前层DOM对象。
	end:function(){}//无论是确认还是取消，只要层被销毁了，end都会执行，不携带任何参数。full/min/restore -分别代表最大化、最小化、还原 后触发的回调
	};
	/*
	layer.config(options) - 初始化全局配置
	layer.ready(callback) - 初始化就绪
	layer.open(options) - 原始核心方法
	layer.alert(content, options, yes) - 普通信息框
	layer.confirm(content, options, yes, cancel) - 询问框
	layer.msg(content, options, end) - 提示框
	layer.load(icon, options) - 加载层
	layer.tips(content, follow, options) - tips层
	layer.close(index) - 关闭特定层
	layer.closeAll(type) - 关闭所有层
	layer.title(title, index) - 改变层的标题
	layer.setTop(layero) -置顶当前窗口
	layer.full()、layer.min()、layer.restore() - 手工执行最大小化
	layer.tab(options) - tab层
	
	layer.tab({
  area: ['600px', '300px'],
  tab: [{
    title: 'TAB1', 
    content: '内容1'
  }, {
    title: 'TAB2', 
    content: '内容2'
  }, {
    title: 'TAB3', 
    content: '内容3'
  }]
});    
	
	*/