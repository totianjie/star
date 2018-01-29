import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../styles/style.css';

class DoneTaskItem extends Component{
    render(){
        return (
            <div className="item-wrapper">
                <span className="icon-checkmark" onClick={ this.clickHandler }></span>
                <span className="message done-message">{ this.props.text }</span>
                <span className="icon-cross del" onClick={ this.delHandler }></span>
            </div>
        );
    }

    clickHandler = () =>{
        let {
            dispatch,index
        } = this.props;
        dispatch({
            type:'GET_DONE_TODO',
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
            type:'DELET_DONE',
            payload:{
                index
            }
        });
    }
}

export default connect()(DoneTaskItem);