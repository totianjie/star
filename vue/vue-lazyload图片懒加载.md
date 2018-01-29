> ##### 图片懒加载    ``vue-lazyload``

1,	``npm install vue-lazyload --save``  然后我们在main.js里面import这个包  

​									``import VueLazyload from 'vue-lazyload'``

2,	配置``vue-lazyload``;

```javascript
Vue.use(VueLazyload, {
  preLoad: '1.3', // 	预加载高度的比例 
  error: require('./assets/default.jpg'), // 这个是请求失败后显示的图片
  loading: require('./assets/loading.gif'), // 这个是加载的loading过渡效果
  attempt: '1', // 尝试次数
  try: 2 // 这个是加载图片数量
})
```



3,   然后在组件里写法是

```javascript
<template>
    <div id="rj">
        <ul id="container">
            <li v-for="img in list">
                <img v-lazy="img">
            </li>
        </ul>
    </div>
</template>
<script>
 export default {
    data () {
        return {
             list: [
               require('./assets/1.jpg'),
               require('./assets/2.jpg'),
               require('./assets/3.jpg'),
               require('./assets/4.jpg')
            ]
        }
    }
 }
</script>
```

eg:

​	这样就可以在页面里实现图片懒加载效果了，当然，官方给出的写法可能和我这个有点出入，但是木有关系啦。

还可以用css的写法，但是没试过，所以就不在这里讲了，要是说错了，丢人啊！

```css
<style>
  img[lazy=loading] {
    /*your style here*/
  }
  img[lazy=error] {
    /*your style here*/
  }
  img[lazy=loaded] {
    /*your style here*/
  }
  /*
  or background-image
  */
  .yourclass[lazy=loading] {
    /*your style here*/
  }
  .yourclass[lazy=error] {
    /*your style here*/
  }
  .yourclass[lazy=loaded] {
    /*your style here*/
  }
</style>
```



### 官网地址https://www.npmjs.com/package/vue-lazyload



