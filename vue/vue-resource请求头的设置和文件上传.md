> ##### 关于vue-resource    请求头的设置

~~~javascript
import Vue from 'vue';
import VueResource from 'vue-resource'; //默认请求头是默认是application/json
//Vue.http.options.emulateJSON = true; // post 提交时，以表单形式提交


// Vue.http.options.headers = {// 全局设置请求头  以Form Data 
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// };


// 如果是有关文件上传和调app，ios接口请求头就一定要设置成
// application/x-www-form-urlencoded; charset=UTF-8'

/**
'Content-Type': 'application/json;charset=UTF-8'
	_body  post的参数  在Request Payload 里面
	_params	url？号后面跟着的参数 在Query String Parameters里面
	
 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
 	 参数在   Form Data 里面
*/
let headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} ;
let _params = {};
let _body = {};
Vue.http.post(uri, _body, { params: _params, headers: headers}).then(function (res) {
        // 走的成功
  		return Promise.resolve(res);
    }, function () {
       	// 走的失败
  		return Promise.reject(err);
    }).catch(function (err) {
  		// catch出来一个错误
        return Promise.reject(err);
    });
~~~

> ##### 关于base64图片  src的设置     

```javascript
let src = `data:image/${res.data.data.imageType};base64,${res.data.data.base64}`;
```

> ##### 文件上传  Form Data

~~~
var img=$("#img")
var input=null
$("#tef").on("change",function(){
	var that=$(this)[0];
	if (!that.files[0]) {return false;}
	input=that.files[0];
	console.log(that.files[0]);
	img.prop("src",window.URL.createObjectURL(input));
});
			
			
var s={aa:"aa"};
var  formData=new FormData();
formData.append("aa",s.aa);
formData.append('file1',input);

$.ajax({
  url: '',
  data: formData // 把这个给后台就可以了
});
~~~

