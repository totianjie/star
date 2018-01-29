> ##### 跳转页面带上参数

```javascript
this.$router.push({ 'path': '/addRepair', query: { router: '/inspect' } });
//接收  
this.$route.query
```
> ##### 监听路由变化

```javascript:;
watch: {
    '$route' () {

    }
}
```

> ##### this.$set

~~~javascript
arr.forEach((item, index) => {
  this.$set(this.a, index, item);
});
~~~

