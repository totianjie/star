> #### 关 于路由的一些参数

```
this.$router	// 路由相关的所有信息

this.$router.options	// 配制的所有路由是一个数组
每个路由中都可以自定义参数   在路由中都可以拿到的
console.log(this.$router.options);
```

如何循环一下路由

```javascript
<ul>
  <li v-for="(item, index) in $router.options.routes" :key="index">
  	{{item.title}} <!-- title是自己定义的 -->
  </li>
</ul>

	{
      path: '/',
      name: 'HelloWorld',
      title: 'hillo',
      component: HelloWorld,
      meta: {a: 12, b: 5}
    },
    {
      path: '/hello',
      name: 'Hello',
      title: 'hill2',
      component: HelloWorld
    }
```

