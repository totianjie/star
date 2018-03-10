在CentOS7上安装mysql时，出现了以下的提示	

​	No package mysql-server available.

原因是：

​	CentOS7带有MariaDB而不是MySQL，MariaDB和MySQL

解决方案：

​	如果必须要安装MySQL，首先必须添加mysql社区repo通过输入命令：sudo rpm -Uvh http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm，最后使用像安装MySQL的常规方法一样安装mysql： yum install mysql mysql-server mysql-libs 



>yum 安装

```
yum install -y mysql-server mysql-devel mysql   ==> 如果怕错就按： mysql mysql-server mysql-devel
```



```
数据库字符集设置
mysql配置文件/etc/my.cnf中加入default-character-set=utf8
```



```
启动mysql服务：
service mysqld start或者/etc/init.d/mysqld start
```



```

```



```

```











>源码安装

```
wget -c http://dev.mysql.com/get/Downloads/MySQL-5.6/mysql-5.6.33-linux-glibc2.5-x86_64.tar.gz
		-c 是断点续传
```



```

```



```

```



```

```



```

```



```

```

