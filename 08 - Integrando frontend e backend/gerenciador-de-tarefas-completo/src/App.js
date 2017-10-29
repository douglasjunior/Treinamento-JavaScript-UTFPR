import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Content from './components/Content';

import LoginPage from './pages/LoginPage';
import UsuarioPage from './pages/UsuarioPage';


class App extends Component {

    state = {}

    toggleSideBar = (event) => {
        this.setState({ sideBarActive: !this.state.sideBarActive })
    }

    renderContent = () => {
        const { sideBarActive } = this.state;
        return (
            <div className="wrapper">
                <NavBar active={sideBarActive} toggleSideBar={this.toggleSideBar} />

                <SideBar active={sideBarActive} />

                <Content />
            </div>
        )
    }

    render() {
        return (
            <Switch>

                <Route path="/login" component={LoginPage} />

                <Route path="/cadastro" component={UsuarioPage} />

                <PrivateRoute path="/" render={this.renderContent} />

            </Switch>
        );
    }
}

export default App;
