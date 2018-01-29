import React, { Component } from 'react';

class Clock extends Component{
    constructor(props){
        super(props)

        this.state = {
            time:new Date()
        };
    }

    componentWillMount(){
        setInterval(()=>{
            this.setState({
                time:new Date()
            });
        },1000);
    }

    render(){
        return (
            <div>
                {this.getHour()}:
                {this.getMinute()}:
                {this.getSecond()}
            </div>
        );
    }

    getHour(){
        return this.toDou(this.state.time.getHours());
    }
    getMinute(){
        return this.toDou(this.state.time.getMinutes());
    }
    getSecond(){
        return this.toDou(this.state.time.getSeconds());
    }
    toDou(n){
        return n<10?'0'+n:n;
    }
}
export default Clock;