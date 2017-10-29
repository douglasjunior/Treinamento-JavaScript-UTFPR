import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import {
    Button, Container, Form,
    FormGroup, Col,
} from 'reactstrap';
import axios from 'axios';

import InputForm from '../components/InputForm';
import { isLoggedIn, saveToken } from '../utils/LoginManager';
import { validateEmail, validateSenha, checkFormIsValid } from '../utils/Validator';

export default class LoginPage extends Component {

    state = { email: '', senha: '' };

    onFormSubmit = (event) => {
        event.preventDefault();

        if (checkFormIsValid(this.refs)) {
            this.postLogin();
        }
    }

    postLogin = () => {
        const { email, senha } = this.state;

        axios.post("/usuarios/login", {
            email, senha
        }).then(response => {
            console.log(response.status);
            if (response.status === 200) {
                saveToken(response.data.token);
                this.props.history.push('/login');
            } else {
                alert('Não foi efetuar login, verifique os dados informados e tente novamente.');
            }
        }).catch(ex => {
            console.error(ex);
            console.error('response', ex.response)
            if (ex.response.status === 422) {
                alert('Usuário ou senha incorretos.');
            } else if (ex.response.status === 422) {
                alert('Não foi efetuar login, verifique os dados informados e tente novamente.');
            } else {
                alert('Não foi efetuar login, tente novamente mais tarde.');
            }
        })
    }

    onCadastrarClick = () => {
        const { history } = this.props;
        history.push('/cadastro')
    }

    onInputChange = (event) => {
        const { id, value } = event.target;
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    render() {
        if (isLoggedIn()) {
            return <Redirect to="/" />
        }

        const { email, senha } = this.state;

        return (
            <Container>
                <h2>Login</h2>

                <Form onSubmit={this.onFormSubmit} style={{ marginTop: 20 }}>

                    <InputForm label="E-mail" id="email" ref="email" value={email} onChange={this.onInputChange} required={true}
                        validator={validateEmail} errorMessage="Informe um e-mail válido." />
                    <InputForm label="Senha" id="senha" ref="senha" value={senha} onChange={this.onInputChange} type="password" required={true}
                        validator={validateSenha} errorMessage="A senha deve conter no mínimo 6 e no máximo 8 caracteres." />

                    <FormGroup row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button type="button" onClick={this.onCadastrarClick} >Cadastrar</Button>
                            {' '}
                            <Button color="primary" >Entrar</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}