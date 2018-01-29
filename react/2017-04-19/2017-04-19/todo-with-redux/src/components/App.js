import React, { Component } from 'react';
import '../styles/app.css';

import Header from './Header';
import TaskInput from './TaskInput';
import TodoPanel from './TodoPanel';
import DonePanel from './DonePanel';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header></Header>
                <TaskInput></TaskInput>
                <div className="wrapper">
                    <TodoPanel></TodoPanel>
                    <DonePanel></DonePanel>
                </div>
            </div>
        );
    }
}

export default App;
