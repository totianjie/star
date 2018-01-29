~~~javascript

var ERR_OK = 0; // 成功状态码

if (typeof Promise === 'undefined') {
  var Promise = _Promise;// _Promise是自封装的
}


// 获取数据
_getData: function (api, data) {
  var promise = new Promise(function (resolve, reject) {
    T.MyPost(api, function (res) {
      if (res.status === ERR_OK && res.data) {
        resolve(res);
      } else {
        console.log('请求失败。res.status !== 0 || res.data返回不正确');
      }
    }, data, false);
  }, function (error) {
    console.log('error: ', api, data);
  }).catch(function (errMsg) {
    console.log(api, ' catch 出来一个错误：', errMsg);
  });
  return promise;
},
~~~

