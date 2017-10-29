import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

import { isLoggedIn, saveToken } from '../utils/LoginManager';

export default class LoginPage extends Component {

    onEntrarClick = () => {
        saveToken('blabla');
        this.forceUpdate();
    }

    onCadastrarClick = () => {
        const { history } = this.props;
        history.push('/cadastro')
    }

    render() {
        if (isLoggedIn()) {
            return <Redirect to="/" />
        }

        return (
            <Container>
                <p>LoginPage</p>

                <Button type="button" onClick={this.onCadastrarClick} >Cadastrar</Button>
                {' '}
                <Button type="button" color="primary" onClick={this.onEntrarClick} >Entrar</Button>
            </Container>
        )
    }
}