import React,{ Component } from 'react';
import { connect} from 'react-redux';
import '../styles/style.css';
import '../styles/taskItem.css';

class TodoTaskItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            text: this.props.text,
            editing: false
        }
    }

    componentDidUpdate(props,state){
        if(this.state.editing && !state.editing){
            this.refs.itemInput.focus();
            this.refs.itemInput.select();
        }
    }

    render(){
        return (
            <div className="item-wrapper">
                <span className="icon-checkmark" onClick={ this.clickHandler }></span>
                <span className="message" style={{display:this.state.editing? 'none' : 'block'}} onDoubleClick={ this.doubleClickHandler }>{ this.props.text }</span>
                <input type="text" value={ this.state.text } style={{display:this.state.editing? 'block' : 'none'}} onChange={ this.changeHandler } onKeyDown={ this.endHandler } onBlur={ this.endHandler } ref="itemInput"/>
                <span className="icon-cross del" onClick={ this.delHandler }></span>
            </div>
        );
    }

    endHandler = (ev) => {
        if(ev.keyCode && ev.keyCode !== 13){
            return;
        }
        this.setState({
            editing: false
        });

        let {
            dispatch,index
        } = this.props;

        dispatch({
            type: 'MODIFY_TASK',
            payload:{
                text: this.state.text,
                index
            }
        });
    }
    clickHandler = () =>{
        let {
            dispatch,index
        } = this.props;
        dispatch({
            type: 'GET_TODO_DONE',
            payload:{
                index
            }
        });
    }

    delHandler = () => {
        if(!confirm('您确定要此项?'))return;
        let {
            dispatch,index
        } = this.props;

        dispatch({
            type: 'DELET_TODO',
            payload:{
                index
            }
        });
    }

    doubleClickHandler = () =>{
        this.setState({
            editing: true
        });
    }

    changeHandler = (ev) =>{
        this.setState({
            text: ev.target.value
        });
    }
}

export default connect()(TodoTaskItem);