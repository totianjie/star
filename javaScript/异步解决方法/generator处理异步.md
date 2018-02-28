```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
    <script>
		// 新建三个文件a.html  b.html c.html
        function fn1 (url) {
            $.get('a.html', function (response) {
                console.log(1);
            });
            $.get('b.html', function (response) {
                console.log(1111);
            });
        }

        function fn2 (url) {
            $.get('b.html', function (response) {
                console.log(2);
            });
        }

        function fn3 (url) {
            $.get('c.html', function (response) {
                console.log(3);
            });
        }

        function* ajaxs () {
            yield fn1();
            yield fn3();
            yield fn2();

            return '完了';
        }

        /*var it = ajaxs();

        console.log(it.next());
        console.log(it.next());
        console.log(it.next());*/

        var a = ajaxs();
        for (let val of a) {
            console.log(val);
        }

        // 依次打印就是   1 111 3 2


    </script>
</head>
<body>

</body>
</html>
```



----------------------

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
    <script>

        function readFile (url) {
            return new Promise((resolve, reject) => {
                $.get(url, function (response) {
                    resolve(response);
                });
            });
        }

        function* ajaxs () {
            let f1 = yield readFile('a.html');

            let f2 = yield readFile('b.html');

            let f3 = yield readFile('c.html');

            return '完了';
        }

        let it = ajaxs();

        let res1 = it.next();

        res1.value.then(res => {
            console.log('第一步', res);
        });
        let res2 = it.next();
        res2.value.then(res => {
            console.log('第二步', res);
        });
        let res3 = it.next();
        res3.value.then(res => {
            console.log('第三步', res);
        });

        // 如果需要两个请求同时回来在做些什么  可以使用
		// Promise.all([p1, p2], res => { // ...  });
    </script>
</head>
<body>

</body>
</html>
```







```
yield语句
迭代器对象的next方法的运行逻辑如下。

（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。

（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

yield语句与return语句既有相似之处，也有区别。

相似之处在于，都能返回紧跟在语句后面的那个表达式的值。

区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield语句。正常函数只能返回一个值，因为只能执行一次return；Generator函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说Generator生成了一系列的值，这也就是它的名称的来历（在英语中，generator这个词是“生成器”的意思）。

***
只有当yield后面跟的函数先执行完，无论执行体里面有多少异步回调，都要等所有回调先执行完，才会执行等号赋值，以及再后面的操作。这也是yield最大的特性
```

