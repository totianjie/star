import React, { Component } from 'react';


class TaskInput extends Component {
    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="请输入待办事项"
                    onKeyDown={ this.keyDownHandler }
                    ref="itemInput"
                />
            </div>
        );
    }

    keyDownHandler=(ev)=>{
        if(ev.keyCode === 13){
            const value = ev.target.value;
            if( !value ){
                return;
            }
            this.props.onEnter(value);
            this.refs.itemInput.value = '';
        }
    }
}

export default TaskInput;
