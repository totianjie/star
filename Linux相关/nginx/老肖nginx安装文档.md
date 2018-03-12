ps aux | grep nginx   查看进程是否有启用
whereis nginx 查看某个东西的安装路径
ll 查看文件列表

yum安装
	yum install nginx 

	yum install gcc-c++   如果提示少了这个模块安装就好了

源码安装
	进入网站http://nginx.org/en/download.html  ===》  点击download ===> 找到一个版本号  右键复制链接  在xshell中输入下面的命令
	-c  是断点续传的意思
	1， wget -c http://nginx.org/download/nginx-1.13.9.tar.gz
	
	2， 解压
		tar -zxvf nginx-1.xxxx
	3， cd nginx-1.xxx 进入nginx文件目录
		./configure	使用默认配制
			如果命令行出现下面的命令   checking for C compiler ... not found   就说明缺少相应模块（自己百度） 
			输入下面的命令安装缺少的模块	yum install gcc gcc-c++ kernel-devel 
			如果还是不行的话就按   nginx安装文档.html里面的步骤安装相应的模块（安装时如遇到版本问题不成功就上相应的官网找最新的）
	
			最好安装下这两个模块也安装一下	
				yum install -y openssl*
				yum -y install ncurses-devel
	4， 编译，安装
		make && make install   (make 就是编译    make install 就是安装)
	
	5， 启动nginx
		1, whereis nginx (查看安装的目录)
		2，cd /usr/local/nginx (进入nginx安装的目录)
		3，cd sbin/
		4,./nginx (启动)  ===>   如果没有报错就说明成功了   测试一下： 复制ip地址在浏览器打开看一下如果可以访问就说明成功了
	6，配制nginx
		whereis nginx (查看安装的目录)
		cd /usr/local/nginx
		cd conf
		vi(vim) nginx.conf  (编辑配制文件)  编辑好了后  esc :wq   保存退出
		
		切到sbin目录
			./nginx -s reload (重启nginx)
	
	启动： ./nginx
	重启： ./nginx -s reload
	关闭： ./nginx -s stop
	
		quit  ：完整有序的停止nginx
		kill -QUIT 主进程号     ：从容停止Nginx
		kill -TERM 主进程号     ：快速停止Nginx
		pkill -9 nginx          ：强制停止Nginx


	netstat -ntlp | grep :80   查看端口被谁在用

**注意：
	SPA项目：记得配置rewrite
	nginx服务配  try_files $uri $uri/ /index.html;  (其实配制这个就是rewrite)
	上vue-router官网里面查看就可以了   也就是上面try_files这一句



	文件上传（把要上传的文件打包成zip包， 把zip包传上云解压就可以了）
		1，命令行输入 rz  （默认会弹出一个框要你选择你要上传的文件，选择打包发好的zip包）
			如果提示  -bash: rz: command not found  （就说明没有没有安装相关的包）  输入下面的命令安装就可以
			yum -y install lrzsz 
			rz  上传文件
			sz filename  下载文件
		2，xftp
	
	解压zip文件:
		unzip 包名
	把某个文件的内容移动到另一个文件夹里面去
		mv /dist /web-view   把根目录下的dist文件夹的内容移动到根目录下的web-view目录里面去了

