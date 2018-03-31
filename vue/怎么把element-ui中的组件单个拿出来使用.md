> #### 把element-ui中的组件变成自己的组件

```
cnpm install element-ui -S	// 先把element-ui下载下来
```

全部组件的目录

```javascript
node_modules\element-ui\packages	// 把需要的组件复制到自己的工程目录
```

css目录

```javascript
node_modules\element-ui\lib\theme-chalk		// 把相对应的css复制到自己的工程目录
```



使用	自己的工程目录	main.js

```javascript
import './assets/button.css'
import './assets/icon.css'

Vue.use(Button);

组件中直接使用
<el-button>aa</el-button>	名字是可以改的，要把相应组件的name值改掉就ok
```

