```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js"></script>
    <script>
		// 新建 三个文件 a.html b.html c.html
        function readFile (url) {
            return new Promise((resolve, reject) => {
                $.get(url, (res) => {
                    resolve(res);
                });
            });
        }

        let asyncReadFile = async function () {
          
            let f1 = await readFile('./a.html');
            console.log(f1); // 做些什么。。。 处理逻辑等等

            let f2 = await readFile('./b.html');
            console.log(f2); // 做些什么。。。 处理逻辑等等

            let f3 = await readFile('./c.html');
            console.log(f3); // 做些什么。。。 处理逻辑等等

            return Promise.resolve([f1, f2, f3]);
        };

        let results = asyncReadFile();

        results.then((res) => {
          // 在这里面处理逻辑也是可以的
            console.log(res);
        });
    </script>
</head>
<body>

</body>
</html>
```



--------------



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
                $.get(url, (res) => {
                    resolve(res);
                });
            });
        }

        let asyncReadFile = async function () {
            return Promise.all([
                await readFile('./a.html'),
                await readFile('./b.html'),
                await readFile('./c.html')
            ]);
          // 这里不return 直接在这里做些什么也是可以的
        };
		
        let results = asyncReadFile();

        results.then((res) => {
          // 做些什么...
            console.log(res);
        });
    </script>
</head>
<body>

</body>
</html>
```

