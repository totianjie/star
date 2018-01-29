笔记
===============================
React
	React.createClass({
		render:function(){
			return (
				<div>
					<h2></h2>
				</div>
				);
		}
	});
	ReactDOM.render(
		<div></div>,
		oEle
	);


	初始状态
		getInitialState:function(){
			return {
				time: new Date()
			}
		},
	即将挂载
		componentWillMount:function(){
			this.setState({
				time: new Date()
			});
		},
		render:function(){}...
===================================================
	create react app
	安装create-react-app
		npm install -g create-react-app

	创建项目
		create-react-app 项目名


		cors 		node模块	


		删除文件
			rm -rf 文件名