> #### 第一步

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

```
或者	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

```
之后 	source ~/.bashrc
```



常用命令

nvm v // 查看nvm版本

nvm install latest // 下载最新的 nodejs

nvm ls available // 列出所有可用的nodejs版本

nvm alias xxx 4.7.0 // 给不同版本号设置别名

nvm unalias xxx // 取消这个别名

nvm ls // 列出已经安装的nodejs版本
nvm install 6.9.0 // 安装不同版本的nodejs

nvm install 6.9.0 32 // 默认是64位，32位需指定

nvm uninstall 6.9.0 // 卸载对就的版本下载完成后
nvm use 6.9.0 // 引入使用
nvm list // 查看已安装 的 node 版本
​    7.2.0    6.2.0   *6.9.0 (Currently using 64-bit executable)



> ### nrm安装

npm install -g nrm

nrm ls    // 查看所有可用的镜像

ls                           查看所有镜像

nrm use cnpm  //switch registry to cnpm 使用某一个镜像

nrm test             测试镜像速度 nrm test 测试使用的镜像



