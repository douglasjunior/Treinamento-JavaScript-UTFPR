import React, { Component } from 'react';
import "./Content.css";

import { Container } from 'reactstrap';

import { Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import TarefasPage from '../pages/TarefasPage';

/**
 * Referência: https://bootstrapious.com/p/bootstrap-sidebar
 */
export default class Content extends Component {
    render() {
        return (
            <Container id="content">
                <Route path="/" exact component={HomePage} />
                <Route path="/tarefas" component={TarefasPage} />
            </Container>
        );
    }
}