笔记
=========================================================
	交互
		jquery
		vue-resource
		axios

	vue-脚手架
	vue-cli
	安装:
		cnpm install vue-cli -g
	如何验证安装
		vue --version

		webpack

	=======================================================
	如何用脚手架
		vue init 主题 名字

			webpack 			项目，测试
			webpack-simple 		简易




			data () {
				return {

				}
			}
			{name: value, name: value}

各种接口
https://bird.ioliu.cn/

https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su
=========================================================
Angular 	Vue

React 		-> 		facebook		
官网:https://facebook.github.io/react/

	引入
		react.js
		react-dom.js
		browser.min.js

----------------------------------------
	ReactDOM.render(要插入什么,插入到谁里面);

		JSX

	ReactDOM.render( 
		<h1>呵呵</h1>, 		这不是html，是JSX
		oBox
	);

	只能有一个根元素

	const Head = React.createClass({
		render:function(){
			return (
				<header>
					<h1>我是头部{ this.props.address }</h1>
				</header>
			);
		}
	});

	ReactDOM.render(
		<Head address="abc"></Head>,
		oBox
	);









