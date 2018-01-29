import React, { Component } from 'react';
import TaskInput from './components/TaskInput';
import TaskPanel from './components/TaskPanel';
import data from './data';

class App extends Component {
    constructor (props){
        super(props);
        this.state = data;
    }
    render() {
        return (
            <div>
                <TaskInput onEnter={ this.onEnter }></TaskInput>
                <TaskPanel title="待办" data={ this.state.todos } onOk={this.changeTodos} onDel={this.delTodos} type="todo" toUpdate={ this.complate }></TaskPanel>
                <TaskPanel title="已完成" data={ this.state.dones } onOk={this.changeDones} onDel={this.delDones} type="done"></TaskPanel>
                <TaskPanel title="垃圾箱" data={ this.state.dusts } onOk={this.changeDusts} onDel={this.delDusts} type="dust"></TaskPanel>
            </div>
        );
    }

    complate=(value,index)=>{
        let {
            todos
        } = this.state;
        todos[index] = value;
        this.setState({
            todos
        });
    }

    onEnter=(value)=>{
        let {
            todos
        } = this.state;
        todos.push(value);
        this.setState({
            todos
        });
    }

    changeTodos=(index)=>{
        let {
            todos,
            dones
        } = this.state;
        const item = todos.splice(index,1);
        dones.push(item);
        this.setState({
            todos,
            dones
        });
    }
    changeDones=(index)=>{
        let {
            todos,
            dones
        } = this.state;
        const item = dones.splice(index,1);
        todos.push(item);
        this.setState({
            todos,
            dones
        });
    }
    changeDusts=(index)=>{
        let {
            todos,
            dusts
        } = this.state;
        const item = dusts.splice(index,1);
        todos.push(item);
        this.setState({
            todos,
            dusts
        });
    }
    delTodos=(index)=>{
        if(!confirm('您确定要删除吗?')){
            return;
        }
        let {
            todos,
            dusts
        } = this.state;
        const item = todos.splice(index,1);
        dusts.push(item);
        this.setState({
            todos,
            dusts
        });
    }
    delDones=(index)=>{
        if(!confirm('您确定要删除吗?')){
            return;
        }
        let {
            dones,
            dusts
        } = this.state;
        const item = dones.splice(index,1);
        dusts.push(item);
        this.setState({
            dones,
            dusts
        });
    }
    delDusts=(index)=>{
        if(!confirm('您确定要删除吗?')){
            return;
        }
        let{
            dusts
        } = this.state;
        dusts.splice(index,1);
        this.setState({
            dusts
        });
    }
}

export default App;
