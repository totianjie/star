import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../styles/style.css';

import '../styles/panel.css';
import DoneTaskItem from './DoneTaskItem';

class DonePanel extends Component {
    render(){
        return (
            <div className="panel">
                    <span className="icon-clock">已完成</span>
                <div className="items-wrapper">
                    { this.getDoneaskItem() }
                </div>
            </div>
        );
    }
    getDoneaskItem=(ev)=>{
        if(this.props.dones.length==0){
            return (<h6>无已完成项</h6>);
        }
        return this.props.dones.map((item,index)=>{
            return <DoneTaskItem text={item} key={index+item} index={index}></DoneTaskItem>
        });
    }
}

export default connect((store)=>{
    // console.log(action);
    return {
        dones: store.dones
    };
})(DonePanel);








