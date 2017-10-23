import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Sobre from './pages/Sobre';
import Login from './pages/Login';

import LoginManager from './LoginManager';

const PrivateRoute = (props) => {
    const { component: Component, ...others } = props;
    return (
        <Route {...others} render={(props) => {
            return LoginManager.usuarioLogado
                ? (<Component {...props} />)
                : (<Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />)
        }} />
    )
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li> <Link to="/" > Página inicial </Link> </li>
                        <li> <Link to="/tarefas" > Tarefas </Link> </li>
                        <li> <Link to="/sobre" > Sobre </Link> </li>
                    </ul>

                    <hr />

                    <Route path="/" exact component={Home} />
                    <Route path="/sobre" component={Sobre} />
                    <PrivateRoute path="/tarefas" component={Tarefas} />
                    <Route path="/login" component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
