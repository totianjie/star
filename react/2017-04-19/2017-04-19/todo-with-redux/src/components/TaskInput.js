import React,{ Component } from 'react';
import '../styles/taskInput.css';
import { connect } from 'react-redux';

class TaskInput extends Component {
    render() {
        return (
            <input type="text" placeholder="请输入待办事项" className="task-input" onKeyDown={ this.keyDownHandler } ref="inputItem"/>
        );
    }

    keyDownHandler = (ev) => {
        if (ev.keyCode !== 13) {
            return;
        }
        let value = ev.target.value;
        if(!value)return;
        this.props.dispatch({
            type:'CREATE_TODO',
            payload:{
                text: value
            }
        });

        this.refs.inputItem.value = '';
    }
}
export default connect()(TaskInput);

