在CentOS7上安装mysql时，出现了以下的提示	

​	No package mysql-server available.

原因是：

​	CentOS7带有MariaDB而不是MySQL，MariaDB和MySQL

解决方案：

​	如果必须要安装MySQL，首先必须添加mysql社区repo通过输入命令：sudo rpm -Uvh http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm，最后使用像安装MySQL的常规方法一样安装mysql： yum install mysql mysql-server mysql-libs 

>yum 安装不推荐  

>wget 源码安装

```
wget -c http://dev.mysql.com/get/Downloads/MySQL-5.6/mysql-5.6.33-linux-glibc2.5-x86_64.tar.gz
		-c 是断点续传
```

> #### 解压

```
tar -zxvf mysql-5.6.33-linux-glibc2.5-x86_64.tar.gz
```

> 复制解压后的mysql目录

```
cp -r mysql-5.6.33-linux-glibc2.5-x86_64 /usr/local/mysql
```

> 添加用户组和用户

```
#添加用户组
	groupadd mysql
#添加用户mysql 到用户组mysql
	useradd -g mysql mysql
```

> 安装

```
cd /usr/local/mysql/
```

```
mkdir ./data/mysql
```

~~~
chown -R mysql:mysql ./
~~~

~~~
./scripts/mysql_install_db --user=mysql --datadir=/usr/local/mysql/data/mysql
~~~

~~~
cp support-files/mysql.server /etc/init.d/mysqld
~~~

~~~
chmod 755 /etc/init.d/mysqld
~~~

~~~
cp support-files/my-default.cnf /etc/my.cnf
~~~

> 修改启动脚本

~~~
vi /etc/init.d/mysqld

#修改项：
basedir=/usr/local/mysql/
datadir=/usr/local/mysql/data/mysql
~~~

> 启动服务

```
service mysqld start
```

> 加入环境变量，编辑 /etc/profile，这样可以在任何地方用mysql命令了

```
export PATH=$PATH:/usr/local/mysql/bin
source /etc/profile
```

```
#启动mysql
	service mysqld start
#关闭mysql
	service mysqld stop
#查看运行状态
	service mysqld status
```

> 数据库操作

```
1).登陆数据库：mysql –u root –p，（root默认密码为空）；

2).退出数据库有三种方法：ctrl+c/quit/exit

3).查看数据库所在路径：which mysql

4).列出所有数据库：show databases;

5).使用数据库：use mysql

6).显示当前数据库下的所有表 show tables;
```

> Navicat连接数据库

```
1)从user表中查询所有可以登录的用户以及支持连接的主机；

select user,host,password from user;

2)新建一个root用户，并给此用户赋予所有数据库及其所有对象的操作权限，这个赋值语句的%代表支持人一主机连接到mysql服务器。赋值语句为：(一般会在连接服务不成功权限问题时会用)

	1: grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
	2: flush privileges;	刷新权限之后就可以使用了 

3)连接前先关闭防火墙：（service iptables stop 即时生效，重启虚拟机后失效）（chkconfig iptables off 重启后生效，永久关闭防火墙）

4)打开Navicat，点击连接，新增连接，输入主机ip，以及上述命令赋予的root用户的密码123456，端口号默认不变。
	
```

> 注意的地方 

```
1) navicat 连接时出现错误  ERROR 1046 (3D000): No database selected
	权限问题
	通过: grant all privileges on *.* to '用户名'@'%' identified by '密码' with grant option;
		 flush privileges;	刷新权限之后就可以使用了 
	赋权就可以  默认mysql安装好后：name=root 密码=空
	运行完上面的命令后会把root用户的密码修改成123456;  只对navicat连接时要用到
	
2) 后台服务器重启后  
	在命令行输入 mysql想进入mysql时会报-bash: aa: command not found
	说明是环境变量的问题：
		export PATH=$PATH:/usr/local/mysql/bin
		source /etc/profile

```

