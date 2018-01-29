> #### vue全局组件定义

``1 自定义组件里面的目录结构``



![](http://img0.ph.126.net/gwfSdP7TEpd_szFLpURd2g==/6632005649120727459.png)

src--|

​	assets--|

​	components--|

​		Loading--|

​			index.js

​			LoadingComponent.vue

​	App.vue

​	main.js

``2 定义组件``

src/components/Loading/index.js

~~~javascript
import LoadingComponent from "./LoadingComponent.vue";

	const Loading = {
		install: function (Vue) {
			Vue.component("Loading", LoadingComponent)
	}
}
export default Loading;
~~~

````html
// 可以直接使用了
<template>
	<loading></loading>
</template>
````

