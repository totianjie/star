~~~javascript
/**
 * Created by Administrator on 2017/12/6.
 */
const http = require('http');   // node原生服务
const fs = require('fs');   // 读写文件
const queryString = require('querystring'); // 处理前台传过来的参数
const urlLib = require('url');  // 处理 url

const server = http.createServer(function (rep, res) {
    // rep  接收请求
    // res  响应请求
    // rep.url  请示的url   localhost:8080/1.html   拿到的是/.html
    // res.write('{code: 1, msg: "失败"}')   向前台发送数据
    // rep.end();   // 结束
    // rep.query    //前台url上发给后台的数据 /?a=12&b=5   无数据时就是个  /
    // res.write();
    // fs.readFile(文件名,function (err, data) {});    // 读文件
    // fs.writeFile(文件名, 写入的东西, function (err, data) {});   // 写文件

    let file_name = rep.url.split('/')[1];
    // fs.readFile(file_name, function (err, data) {
    //     if (err) {
    //         res.write('404');
    //     } else {
    //         res.write(data);
    //     }
    //     res.end();
    // });
    fs.writeFile('b.txt', '刚刚写入的内容', function (err, data) {
        if (err) {
            res.write('404');
        } else {
            console.log(data);
            // res.write(data);
        }
        res.end();
    });
    console.log(file_name);
    // console.log(rep.query);
    // console.log(rep.url);
});
server.listen(8080);
~~~

fs的使用

~~~javascript
const fs = require('fs');   // 读写文件
	// 读取文件   返回的成功后把data返回给前台就可以了
    let file_name = rep.url.split('/')[1];
    // fs.readFile(file_name, function (err, data) {
    //     if (err) {
    //         res.write('404');
    //     } else {
    //         res.write(data);
    //     }
    //     res.end();
    // });

// 写入内容 
 fs.writeFile('b.txt', '刚刚写入的内容', function (err, data) {
        if (err) {
            res.write('404');
        } else {
            console.log(data);
            // res.write(data);
        }
        res.end();
    });
// 改文件名
fs.rename(老名, 新名, function (err){});
~~~



url的使用

~~~javascript
const urlLib = require('url');  // 处理 url

let obj = urlLib.parse('www.baidu.com/a?a=12&b=5');
// obj.pathname   /a    
// obj.query     a=12&b=5'



let obj = urlLib.parse('www.baidu.com/a?a=12&b=5', true);

// obj.query     query: { a: '12', b: '5' },
~~~

querystring的使用

~~~javascript
const queryString = require('querystring'); // 处理前台传过来的参数

	var str = rep.url.split('?')[1];    // 接收的是a=12&b=5
	// var obj = urlLib.parse(rep.url);   // 没有写true  obj.query  a=12&b=5 
	// var str = obj.query;
    console.log(queryString.parse(str));  // {a:12, b:5}   解析成这样
~~~

node模块化

~~~javascript
require
1.如果有"./"
	从当前目录找

2.如果没有"./"
	先从系统模块
	再从node_modules找  如果同名了系统的优先级高一点
	
	
./		当前文件里面
不加./		必须放在node_modules里面

后缀名     ".js"可选  可以不加
var a = require('b');   
// 单个输入
exports.a = 12;
exports.b = 5;

// 批量输出
module.exports = {a:12, b:5};
~~~

如何登录npm 和上传插件到npm上

~~~
cmd
npm login
用户名 tianjie
密码 tianjie123456
邮箱 tianjiex@sina.cn


登录后
npm init  填写一些信息 
	生成一个package.json的文件
	会要你建一个index.js
	
	index.js中// 像平时一样导出模块就可以了
	exports.sum = function () {}
运行 这是把index这个模块上传到npm上去   npm publish
npm --force unpublish  删除自己上传的模块
		
~~~

express

```javascript
原生：
	res.write();
	res.end();
express
	*res.send();
	res.write();
	res.end();

express保留了原生的功能，添加了一些方法(send)，增强原有的功能

-----------------------------------------------------------------------------------------------

//1.创建服务
var server=express();

//2.监听
server.listen(8080);

//3.处理请求
server.use('地址', function (req, res){
});

------------------------------------------------------------------------------------------------

3种方法：
.get('/', function (req, res){});
.post('/', function (req, res){});
.use('/', function (req, res){});

------------------------------------------------------------------------------------------------
express框架：
	1.依赖中间件
	2.接收请求
  		get/post/use
  		get('/地址', function (req, res){});
	3.非破坏式的
 		 req.url
	4.static用法
 		 const static=require('express-static');
 		 server.use(static('./www'));

------------------------------------------------------------------------------------------------
GET-无需中间件
req.query

POST-需要body-parser	解析post数据   // application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({}));

server.use(function (){
	req.body
});

POST文件上传  multer		解析post文件   multipart/form-data

var obj=multer({dest: 'upload/'});  // 上传的文件放在哪个目录下

server.use(obj.any());   // any();   是支持所有文件

server.use(function (req, res){
	req.files[0].originalname  // 上传过来的原文件名
	req.files[0].path  // 上传过来的文件及目录  但是还没有扩展名  upload/aadfaew324we34
});

把扩展名加上
		//'upload/aadfaew324we34' + '.txt'
		//'upload/aadfaew324we34.txt'
var newName=file.path+pathLib.parse(file.originalname).ext;

fs.rename(老名, 新名, function (err){});

-----------------------------------------------------------------------------------------------

链式操作：

------------------------------------------------------------------------------------------------

1.GET、POST
  req.query
  
  server.use(bodyParser.urlencoded({limit: }));
  server.use(function (req, res, next){
    req.body
  });

2.链式操作
  server.use(function (req, res, next){});
  server.get('/', function (req, res, next){});
  server.post(function (req, res, next){});

  next——下一个步骤
  next();

  server.use('/login', function (){
    mysql.query(function (){
      if(有错)
        res.emit('error');
      else
        next();
    });
  });

3.中间件(body-parser)、自己写中间件
  next();

  server.use(function (req, res, next){
    var str='';
    req.on('data', function (data){
      str+=data;
    });
    req.on('end', function (){
      req.body=querystring.parse(str);
      next();
    });
  });
```

cookie,  session

```javascript
cookie：在浏览器保存一些数据，每次请求都会带过来
  *不安全、有限(4K)

session：保存数据，保存在服务端
  *安全、无限
-----------------------------------------------------------------------------------------------
session：基于cookie实现的
  *cookie中会有一个session的ID，服务器利用sessionid找到session文件、读取、写入

  隐患：session劫持
------------------------------------------------------------------------------------------------
cookie
1.读取——cookie-parser
2.发送——

session
cookie-session
------------------------------------------------------------------------------------------------
cookie：
1.cookie空间非常小——省着用
2.安全性非常差

1.精打细算
2.校验cookie是否被篡改过

a.发送cookie
res.secret='字符串';  //   这个就是密钥  在这里也可以不写这一段，因为下面已经写了
res.cookie(名字, 值, {path: '/', maxAge: 毫秒, signed: true});  // signed: true就是需要签名

b.读取cookie
cookie-parser

server.use(cookieParser('秘钥'));

server.use(function (){
	req.cookies		未签名版
	req.signedCookies	签名版
});

c.删除cookie
res.clearCookie(名字);

------------------------------------------------------------------------------------------------

cookie-parser   可用于签名
cookie-encrypter    加密cookie用的  可以上npm上看文档    一般不会加密   看需求吧

------------------------------------------------------------------------------------------------

1.cookie-存在浏览器，4K，不安全
  签名、加密

2.session-存在服务器
  不能独立存在，基于cookie
  
  eg:
	var keys=[];

    for(var i=0;i<100000;i++){
      keys.push('sig_'+Math.random());
    }
	server.use(cookieParser('签名字符串'));
      server.use(cookieSession({
		name: 'sess_id',
        keys: keys,
        maxAge: 2*3600*1000
      }));	

      server.use(function (req, res){
          res.cookie(名字, 值, {signed: true});

          res.cookies['user']; // 未签名的
       	  req.signedCookies['name'];	// 签名过的    signed: true   告诉cookie要签名
          res.clearCookie('名字');	// 删除cookie

          res.session['sess_id']	// 获取session
          delete res.session['xxx'];	// 删除session
      });
```

crypto加密	

```javascript
const crypto = require('crypto');
// 解密的方用的是穷举

var obj = crypto.createHash('md5');
obj.updata('123456');

var str = obj.digest('hex');
console.log('加密后的', str);



eg:
// libs/common.js
	const crypto=require('crypto');
    module.exports={
      MD5_SUFFIX: 'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)',
      md5: function (str){
        var obj=crypto.createHash('md5');

        obj.update(str);

        return obj.digest('hex');
      }
    };
// 使用的地方  
	const common=require('./libs/common');

    var str='123456';
    var str=common.md5(str + common.MD5_SUFFIX);

    console.log(str);


```



```javascript

```

consolidate

```javascript
模板引擎：适配
1.consolidate

consolidate=require('consolidate');

server.set('view engine', 'html'); // 编译成什么文件
server.set('views', '模板文件目录'); // 需要编译的文件目录 
server.engine('html', consolidate.ejs); //  编译的文件用到的模板引擎  也可多个同时使用
											eg:server.engine('xml', consolidate.jade)

server.get('/', function (req, res){
	res.render('模板文件', 数据);
});
```

mysql语名   及    介绍

```
NodeJS不支持MySQL ---->  node的mysql模块

1.连接
2.查询

SQL：
4大查询语句——增删改查

*增-INSERT
	INSERT INTO 表 (字段列表) VALUES(值列表)
	INSERT INTO `user_table` (`ID`, `username`, `password`) VALUES(0, 'blue2', '987654');

*删-DELETE
	// 一定要代上条件不然删除的是整个表
	DELETE FROM 表 WHERE 条件

*改-UPDATE
	// 一定要代上条件不然改的是整个表
	UPDATE 表 SET 字段=值,字段=值,... WHERE 条件
	

*查-SELECT
	SELECT 什么 FROM 表
	SELECT * FROM `user_table`;
------------------------------------------------------------------------------

子句：
WHERE 条件

WHERE name='blue'
WHERE age>18
WHERE age<=18
WHERE age>=18 AND score<60
WHERE cach>100 OR score>10000

ORDER 排序
ORDER BY age ASC/DESC
  ASC-升序(从小到大)
  DESC-降序(从大到小)

--------------------------

ORDER BY price ASC

*价格(price)升序排序，如果价格相同，再按销量(sales)降序排序
ORDER BY price ASC, sales DESC

--------------------------

GROUP	聚类-合并相同

*统计每个班人数
ID	class	name
"1"	"1"	"小明"
"2"	"2"	"小红"
"3"	"1"	"小刚"
"4"	"2"	"小华"
"5"	"3"	"小强"
"6"	"3"	"小四"
"7"	"1"	"小刘"
"8"	"1"	"小花"

SELECT * FROM student_table;
ID	class	name
"1"	"1"	"小明"
"2"	"2"	"小红"
"3"	"1"	"小刚"
"4"	"2"	"小华"
"5"	"3"	"小强"
"6"	"3"	"小四"
"7"	"1"	"小刘"
"8"	"1"	"小花"

SELECT * FROM student_table GROUP BY class;
ID	class	name
"1"	"1"	"小明"
"2"	"2"	"小红"
"5"	"3"	"小强"

SELECT class FROM student_table GROUP BY class;
class
"1"
"2"
"3"

SELECT class,COUNT(class) FROM student_table GROUP BY class;
class	COUNT(class)
1	4
2	2
3	2

--------------------------
GROUP-合并

*统计每个班的平均分
>SELECT * FROM student_table;
ID	class	name	score
1	1	小明	34
2	2	小红	98
3	1	小刚	26
4	2	小华	99
5	3	小强	18
6	3	小四	95
7	1	小刘	57
8	1	小花	100

>SELECT * FROM student_table GROUP BY class;
ID	class	name	score
1	1	小明	34
2	2	小红	98
5	3	小强	18

>SELECT class,AVG(score) FROM student_table GROUP BY class;
class	score
1	54.25
2	98.5
3	56.5

*每个班级的最高、最低分
>SELECT class,MAX(score),MIN(score) FROM student_table GROUP BY class;
ID	class	name	score
1	1	小明	34
2	2	小红	98
3	1	小刚	26
4	2	小华	99
5	3	小强	18
6	3	小四	95
7	1	小刘	57
8	1	小花	100

------------------------------------------------------------------------------

*每个人的消费总额
ID	name	price
1	blue	3
2	blue	5
3	张三	28000
4	李四	81000
5	blue	4
6	张三	46000
7	李四	38000
8	赵六	18

SELECT name,SUM(price) FROM sales_table GROUP BY name;

SELECT name,SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) DESC;
name	SUM(price)
李四	119000
张三	74000
赵六	18
blue	12

SELECT name,SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) ASC;

------------------------------------------------------------------------------
WHERE子句
ORDER子句——多条件排序
GROUP子句——合并
*LIMIT-分页
	LIMIT 10;	前10条
	LIMIT 5,8;	从5开始，要8个 (从哪开始，拿多少个)

  、COUNT  记数
  、MIN	  最小值
  、MAX	  最大值
  、AVG	  平均值

--------------------------

子句之间是有顺序
WHERE GROUP ORDER LIMIT
筛选  合并  排序  限制

--------------------------

SQL标准写法：
1.关键字大写
2.库、表、字段需要加上``

------------------------------------------------------------------------------

1.下载mysql模块(client)
2.连接
	//createConnection(哪台服务器, 用户名, 密码, 库)
	var db=mysql.createConnection({
      host: 'localhost',
      port: '默认是3306，可以在这里改', 
      user: '用户名', 
      password: '密码', 
      database: '数据库名字'
	});
3.查询
	db.query(SQL, (err, data)=>{})
4.SQL语句
	增删改查

------------------------------------------------------------------------------


















```





第七节讲的是node模块介绍

~~~
模块化——
1.系统模块：http、querystring、url
2.自定义模块
3.包管理器

系统模块：

断言：

www.baidu.com->
getServer

Crypto	加密
Events	事件
Net	网络操作
OS	操作系统信息
Path	处理文件路径
Stream	流操作
Timers	定时器
ZLIB	压缩

require

-----------------------------------------------------------------------------

/usr/tmp/aaa/a.txt
/usr/tmp/aaa/
a.txt
.txt

-----------------------------------------------------------------------------

自定义模块
~~~

数据库基础介绍

~~~
数据 - 数据库   SQL=>Structured Query Language(结构化查询语句)

关系型数据库：
MySQL、Oracle、SQLServer、Access、db2、fox pro

MySQL：
免费、中小网站
优点：性能非常不错
缺点：集群、容灾稍微弱一些

Oracle：
挺贵、大型应用、金融级
优点：性能非常不错、集群、容灾非常强
缺点：挺贵

文件型：
sqlite、mongodb

空间型：

------------------------------------------------------------------------------

Server端：
数据存在

Client端：
管理工具、Node

------------------------------------------------------------------------------

Server安装

------------------------------------------------------------------------------

数据基本概念：
两种单位：
1.库：文件夹-用来管理，本身没法存数据
2.表：文件-存数据的

表-Excel：
行-一条数据
列(字段、域)-一个数据项

------------------------------------------------------------------------------

用户名
密码

主键：唯一、性能高
	唯一标识符

------------------------------------------------------------------------------

server：
client：
	Navicat-管理工具
	NodeJS-程序

------------------------------------------------------------------------------

库-管理，存不了数据
表-存数据
字段-列
行-一条数据
~~~

```javascript
const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const multer=require('multer');
const multerObj=multer({dest: './static/upload'});
const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');

var server=express();
server.listen(8080);

//1.获取请求数据
//get自带
server.use(bodyParser.urlencoded());
server.use(multerObj.any());

//2.cookie、session
server.use(cookieParser());
(function (){
  var keys=[];
  for(var i=0;i<100000;i++){
    keys[i]='a_'+Math.random();
  }
  server.use(cookieSession({
    name: 'sess_id',
    keys: keys,
    maxAge: 20*60*1000  //20min
  }));
})();

//3.模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

//4.route
server.use('/', require('./route/web.js')());
server.use('/admin/', require('./route/admin/index.js')());

//5.default：static
server.use(static('./static/'));

// ./route/admin/index.js
const express=require('express');
const common=require('../../libs/common');

module.exports=function (){
  var router=express.Router();

  //检查登录状态
  router.use((req, res, next)=>{
    if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
      res.redirect('/admin/login');
    }else{
      next();
    }
  });

  router.get('/', (req, res)=>{
    res.render('admin/index.ejs', {});
  });

  router.use('/login', require('./login')());
  router.use('/banners', require('./banners')());
  router.use('/custom', require('./custom')());

  return router;
};


// ./route/web.js
const express=require('express');

module.exports=function (){
  var router=express.Router();

  router.get('/', (req, res)=>{
    res.send('我是web').end();
  });
  return router;
}



```

