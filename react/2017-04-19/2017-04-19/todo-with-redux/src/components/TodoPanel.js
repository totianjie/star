import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../styles/style.css';

import '../styles/panel.css';
import TodoTaskItem from './TodoTaskItem';

class TodoPanel extends Component {
    render(){
        return (
            <div className="panel">
                    <span className="icon-drawer">待办</span>
                <div className="items-wrapper">
                    { this.ajax() }
                    { this.getTodoTaskItem() }
                </div>
            </div>
        );
    }

    getTodoTaskItem=(ev)=>{
        if(this.props.todos.length==0){
            return (<h6>无待办项</h6>);
        }
        return this.props.todos.map((item,index)=>{
            return <TodoTaskItem text={item} key={index+item} index={index}></TodoTaskItem>
        });
    }
}

export default connect((store)=>{
    // console.log(action);
    return {
        todos: store.todos
    };
})(TodoPanel);








