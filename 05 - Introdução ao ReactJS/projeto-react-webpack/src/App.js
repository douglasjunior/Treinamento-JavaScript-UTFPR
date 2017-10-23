import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Alert } from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    Nosso primeiro projeto com React e Webpack.
                </p>
                <Alert color="primary">
                    This is a primary alert — check it out!
                </Alert>
                <Alert color="secondary">
                    This is a secondary alert — check it out!
                </Alert>
                <Alert color="success">
                    This is a success alert — check it out!
                </Alert>
                <Alert color="danger">
                    This is a danger alert — check it out!
                </Alert>
                <Alert color="warning">
                    This is a warning alert — check it out!
                </Alert>
                <Alert color="info">
                    This is a info alert — check it out!
                </Alert>
                <Alert color="light">
                    This is a light alert — check it out!
                </Alert>
                <Alert color="dark">
                    This is a dark alert — check it out!
                </Alert>
            </div>
        );
    }
}

export default App;
