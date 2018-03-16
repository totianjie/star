```
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
	ORDER子句——多条件排序
		ORDER BY price ASC, sales DESC
GROUP子句——合并	
	GROUP BY class
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

