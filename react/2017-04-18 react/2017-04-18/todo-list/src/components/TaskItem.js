import React, { Component } from 'react';

class TaskItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            text: this.props.text
        };
    }
    componentDidUpdate(props,state){
        if(this.state.editing && !state.editing){
            this.refs.inputItem.focus();
            this.refs.inputItem.select();
        }
    }
    render() {
        let style = {};
        if(this.props.type==='done'||this.props.type==='dust'){
            style = {
                textDecoration: 'line-through',
                color: '#666'
            };
        }
        style.display = this.state.editing ? 'none' : 'inline-block';

        return (
            <div>
                <button onClick={ this.clickHandler }>√</button>
                <span style={style} onDoubleClick={ this.modifyHandler }>{ this.props.text }</span>
                <input type="text" value={ this.state.text } onChange={ this.updateHandler } style={{ display: this.state.editing?'inline-block':'none' }} onKeyDown={ this.complateHandler } onBlur={ this.complateHandler } ref="inputItem"/>
                <button onClick={ this.clickDelHandler }>×</button>
            </div>
        );
    }

    complateHandler=(ev)=>{
        if(ev.keyCode&&ev.keyCode!==13){
            return;
        }
        this.setState({
            editing:false
        });

        this.props.toUpdate(this.state.text,this.props.index);
    }

    updateHandler=(ev)=>{
        this.setState({
            text: ev.target.value
        });
    }

    clickHandler=()=>{
        const index = this.props.index;
        this.props.onOk(index);
    }
    clickDelHandler=()=>{
        const index = this.props.index;
        this.props.onDel(index);
    }

    modifyHandler=()=>{
        if(this.props.type==='todo'){
            this.setState({
                editing:true
            });
        }
    }
}

export default TaskItem;
