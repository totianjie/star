import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskPanel extends Component {
    render() {
        return (
            <div>
                <h2>{ this.props.title }</h2>
                <div>
                    { this.getItems() }
                </div>
            </div>
        );
    }
    getItems=()=>{
        var data = this.props.data;
        if(data.length===0){
            return (<h6>无事项</h6>);
        }
        return data.map((text,index)=>{
            return <TaskItem text={ text } key={text+index} index={index} onOk={this.props.onOk} onDel={this.props.onDel} type={this.props.type} toUpdate={  this.props.toUpdate }></TaskItem>;
        });
    }
}

export default TaskPanel;
