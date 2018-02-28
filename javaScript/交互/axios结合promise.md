~~~javascript

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

function ajax (url, data, options) {
    if (!url) {
        layer.msg('请传入url参数');
        return false;
    }
    var data = data || {};
    var options = options || {};
    options.params = options.params || {};
    if (!options.method) {
        options.method = 'get';
    }

    if (!options.loading) {
        options.loading = true;
    }
    var loadingIndex = -1;
    if (options.loading) { // 是否需要loading 默认是要
        loadingIndex = layer.load(1, {
            shade: [0.1, '#000'] //0.1透明度的白色背景
        });
    }
    if (!options.transformRequest) {
        options.transformRequest = [];
    }
    if (!options.headers) {
        options.headers = {};
    }
    return axios({
        method: options.method,
        headers: options.headers,
        url: url,
        data: data,
        params: options.params,
        transformRequest: options.transformRequest
    }).then(function (result) {
        if (options.loading) { // 是否需要loading 默认是要
            layer.close(loadingIndex);
        }
        if (result.status === 200 && result.data.status === 0&& result.data.isSuccess) {
            return Promise.resolve(result.data);
        } else {
            layer.msg(result.data.message);
            return Promise.reject(result);
        }
    }, function (err) {
        layer.msg('api.ERROR');
        console.error('api.ERROR：', err);
        return Promise.reject(err);
    }).catch(function (err) {
        if (err.data && err.data.message) {
            layer.msg(err.data.message);
        } else {
            layer.msg('api.ERROR');
            console.error('api.ERROR：', err);
        }
        return Promise.reject(err);
    });
}

// 调用
  function getOrgTreeDataApi (data, options) { // 获取组织树数据
    return ajax(API.org_tree_data_auth_query, data, options);
  }
// 使用时调用的地方 还可改一改，
~~~

