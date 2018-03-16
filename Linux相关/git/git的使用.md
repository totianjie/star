> ##### git	流程

~~~
下载项目
	git clone
查看修改项
	git status
提交
	git add . 和git commit -m "备注"  （git commit -a -m "备注"  ）
切换到主分支
	git checkout develp
在主分去上拉取最新代码
	git pull --ff
然后切换到自己分去上
	git checkout feature
然后把自己分去代码跟主分去和并
	git rebase develop
然后在切换到主分去
	git checkout develop
然后在主分去上和并自己分支上的代码
	git merge --no-ff feature
然后
	git push
~~~

> ##### 分支管理

~~~
git branch -a					查看所有分支
git branch 分支名				 创建分去
git branch -d 分支名			 删除分支（-D强制删除）
git push origin 分支名			 创建远程分支
git push origin --delete 分支名		删除远程分支
git branch --merged				列出被合并的分支
git branch --no-merged 			列出没有被合并的分支 
git checkout -b 分支名 origin/分支名	创建并切换本地分支 并并联远程分去
git branch --set-upstream-to=origin dev	本地分支关联远程dev分支
	
eg:新建远程分支和删除
	新建分支
      git checkout -b 分支名

      把新建的本地分支push到远程服务器，远程分支与本地分支同名（当然可以随意起名）：
      git push origin dbg_lichen_star:dbg_lichen_star
    
	删除远程分支
      我比较喜欢的简单方式，推送一个空分支到远程分支，其实就相当于删除远程分支：
      git push origin :dbg_lichen_star
      也可以使用：
      git push origin --delete dbg_lichen_star
~~~

> ##### 关于提交

~~~
git push --set-upstream origin tianjie0914  提交到指定分支
~~~

> ##### linux命令

```
git config -l 				查看配制信息
git config -e				编辑配制信息
git help clone   			查看帮助   按f上一页b上一页 q退出帮助文档
git diff					查看文件改变状态（工作区）
git diff --staged			查看文件改变状态（暂存区）

git tag 					查看tag
git tag -a v1.1(版本号) -m ""		添加tag
git show v1.1(版本号)				查看tag信息
```

> ##### 合并

~~~
// 有分叉
  
  git checkout develp		切换到主分支
  
  git pull --ff				在主分去上拉取最新代码
  
  git checkout feature		然后切换到自己分去上
  
  git rebase develop		然后把自己分去代码跟主分去和并
  
  git checkout develop		然后在切换到主分去
  
  git merge --no-ff feature	然后在主分去上和并自己分支上的代码
  
// 没有分叉
	test分支（添加修改了文件）
		git add .	
		git commit -m ""	
		git checkout master			切换到主分支
	master分支（主分支  添加修改了内容）
		git add . 	
		git commit -m "" 	
		git rebase master test(重写test分支--会跳到test分支)	
		git checkout master(切换到主分支)
		git merge test (合并完成了)
		（这样合并出来的不会有分叉 是在一条直线上的  git lg 可以看到）
~~~

> ##### 配制用户名和邮箱

~~~
git config --global user.name "名字"  （不加--global就是局部的）
git config --global user.email "主邮箱"（不加--global就是局部的）


如果没有配制局部信息会默认使用全局信息  局部配制过了就使用局部信息
查看全局的用户名和邮箱 在c盘-》用户->用户名-》.gitconfig文件里面（可以修改）
~~~

> ##### 增强版log 

~~~
**查看日志修改  如果信息过多  按 q  可以退出

  git log -n  查看第n次的日志
  git log --oneline（格式化了log信息）
  git log --oneline --decorate(查看项目完整的逻辑结构。)
  
  （配制下面这个  提供版本号前七位  以后就是  git lg  就可以了）
  git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
~~~

> ##### 配制别名

~~~
局部的
  git config alias.st "status"   以后输入git st  和  git status  效果一样
  git config alias.ci "commit -m" 以后输入 git ci 和 git commit -m 效果一样
  
《《alias.简写名称 "以前的指令 可以包参数（上面的-m就是参数）"》》
全局的	(加--global)

git config --global alias.st "status"
~~~

> ##### 版本回退

~~~
  git reset  --hard HEAD^   一个^就是一个版本
  git reset  --hard HEAD	  回退到最高版本
  git reset --hard 版本号   回退到指定版本号
  git reflog   查看所有修改过的版本号（所有的版本都有记录 有的时候返回又清屏了就看不到了 所以这个命令可以看到）

  git checkout 文件名	提交时发现文件修改了    但又想返回不修改  就输入   （输入文件夹名就整个文件夹下面的返回）
  git stash	跟git checkout --  但checkout --  返回后就拿不回来了   这个是可以的
  git stash apply	拿回git stash 不要的东西
~~~

> ##### 关于本地创建

~~~
1.初始化		git init 	多了一个.git（隐藏文件不要乱动）
	查看隐藏文件	cd .git(进入要查看的文件夹)  ls -al
2.创建文件	touch 文件名
3.查看文件状态	git status 
	现在文件名应该是红色的
4.添加到git版本控制中：git add .
	现在文件名应该是绿色的(把文件修改提交到暂存区)
5.提交代码：git commit -m '备注'（把暂存区的所有内容提交到当前分支）



初始化服务器	git init --bare	（创建一个本地版本库）
~~~

#### 常用的命令

```
clear 						清屏
exit 						退出
cd E: 						切换盘符
ls 							查看文件列表
ll 							查看文件列表详细信息
ll -a						查看隐藏文件
git mv 文件名 新的文件名	  改文件名
mv /dist /web-view   		把根目录下的dist文件夹的内容移动到根目录下的web-view目录里面去了
mkdir 文件名				  新建文件夹
cat	文件名 				  读文件内容
touch	文件名				  创建文件
echo "内容"> 文件名			创建文件（可以带内容也可以不带）
echo "添加的内容">> 文件名	  修改文件内容
pwd							查看当前文件路径					
whereis nginx 				查看某个东西的安装路径
ps aux | grep nginx   		查看进程是否有启用
ping 域名					  查看这个域名是从哪个ip过来的
rz							上传文件
unzip						解压文件
*ps aux | grep nginx			查看某个程序的进程
*kill 杀掉某一进程
		kill 2868  杀掉2868编号的进程
		★kill -9 2868  强制杀死进程kill 杀掉某一进程
vim /etc/sudoers			编辑器此文件给用户添加权限
							添加tianyu    ALL=(ALL)       ALL		就这样就可以了	
passwd root					修改root密码     
```

> #### linux 重启

```
reboot  -f：强制重新开机，不调用shutdown指令的功能；

 reboot  -i：在重开机之前，先关闭所有网络界面；

 reboot  -n：重开机之前不检查是否有未结束的程序； 

 reboot -w：仅做测试，并不真正将系统重新开机，只会把重开机的数据写入/var/log目录下的wtmp记录文件
```

> ##### linux 环境变量地址

```
vim /etc/profile		打开配制文件 编辑

source /etc/profile		编辑保存后运行这个命令马上生效新增的环境变量
```

> #### linux防火墙文件地址

```
控制台输入：
	sestatus   查看防火墙状态
		enforcing 为开启
		disabled为关闭
vim /etc/sysconfig/selinux	打开防火墙配制文件  编辑
	SELINUX=disabled
		

```



##### vim	编辑器

```
vi 	文件名					  创建文件（修改文件）
vi 文件名
i	进入编辑模式
ESC	退出编辑模式

:q  	退出
:wq		保存并退出
:q! 	不保存并退出
:w 		保存
:w! 	强行保存

行内跳转：	0: 绝对行首		^: 行首的第一个非空白字符		 $: 绝对行尾

行间跳转	gg: 第一行			G：最后一行		#G：跳转至第#行	
  
翻屏		Ctrl+f: 向下翻一屏	Ctrl+b: 向上翻一屏	Ctrl+d: 向下翻半屏	Ctrl+u: 向上翻半屏

撤消编辑操作 u：撤消前一次的编辑操作				#u: 直接撤消最近#次编辑操作
 			连续u命令可撤消此前的n次编辑操作	  撤消最近一次撤消操作：Ctrl+r
 			
删除单个字符	x: 删除光标所在处的单个字符			 #x: 删除光标所在处及向后的共#个字符
删除命令:	  dd: 删除当前光标所在行		         #dd: 删除包括当前光标所在行在内的#行；
复制命令 y	  yy: 复制当前行						#yy: 复制包括当前光标所在行在内的#行

粘贴命令 p
    p: 如果删除或复制为整行内容，则粘贴至光标所在行的下方，如果复制或删除的内容为非整行，则粘贴至光标所在        字符的后面
替换：	r：单字符替换		#r: 光标后#个字符全部替换		R: 替换模式
    
查找	/PATTERN	?PATTERN		n 下一个		N 上一个
    
显示行号	:set number		:set nonumber
语法高亮	 :syntax on		:syntax off
```

