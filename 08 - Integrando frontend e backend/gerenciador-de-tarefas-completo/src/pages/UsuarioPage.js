import React, { Component } from 'react';

import {
    Form, FormGroup,
    Col, Button,
    Container,
} from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

import InputForm from '../components/InputForm';
import { validateEmail, validateSenha, checkFormIsValid } from '../utils/Validator';

const DATE_FORMAT = 'DD/MM/YYYY';

export default class UsuarioPage extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        nascimento: ''
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        if (checkFormIsValid(this.refs)) {
            this.postUsuario();
        }
    }

    postUsuario = () => {
        const { nome, email, senha, nascimento } = this.state;

        axios.post('/usuarios', {
            nome, email,
            senha,
            nascimento: moment(nascimento, DATE_FORMAT).format("YYYY-MM-DD")
        }).then(response => {
            console.log(response.status);
            if (response.status === 201) {
                alert('Usuário cadastrado com sucesso!');
                this.props.history.push('/login');
            } else {
                alert('Não foi possível cadastrar o usuário, verifique os dados informados e tente novamente.');
            }
        }).catch(ex => {
            console.error(ex);
            console.error('response', ex.response)
            if (ex.response.status === 422) {
                alert('Não foi possível cadastrar o usuário, verifique os dados informados e tente novamente.');
            } else if (ex.response.status === 412) {
                if (ex.response.data.type === 'unique')
                    alert('E-mail já cadastrado na base de dados.');
            } else {
                alert('Não foi possível cadastrar o usuário, tente novamente mais tarde.');
            }
        })
    }

    onCancelarClick = (event) => {
        this.props.history.push('/login');
    }

    onInputChange = (event) => {
        const { id, value } = event.target;
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    onNascimentoChange = (date) => {
        this.setState({ nascimento: date });
    }

    validateNascimento = (value) => {
        return moment(value, DATE_FORMAT, true).isValid();
    }

    render() {
        const { nome, email, senha, nascimento } = this.state;
        return (
            <Container style={{ maxWidth: 580 }}>
                <h2>Cadastro de Usuários</h2>

                <Form onSubmit={this.onFormSubmit} style={{ marginTop: 20 }}>
                    <InputForm label="Nome" id="nome" ref="nome" value={nome} onChange={this.onInputChange} required={true}
                        validator={value => !!value && value.length >= 3} errorMessage="O nome é obrigatório." />
                    <InputForm label="E-mail" id="email" ref="email" value={email} onChange={this.onInputChange} required={true}
                        validator={validateEmail} errorMessage="Informe um e-mail válido." />
                    <InputForm label="Senha" id="senha" ref="senha" value={senha} onChange={this.onInputChange} required={true}
                        type="password"
                        validator={validateSenha} errorMessage="A senha deve conter no mínimo 6 e no máximo 8 caracteres." />
                    <InputForm label="Nascimento" id="nascimento" ref="nascimento" value={nascimento} onChange={this.onInputChange} required={true}
                        type="date" dateFormat={DATE_FORMAT}
                        validator={this.validateNascimento} errorMessage="Informe a data de nascimento no formato dd/mm/aaaa." />
                    <FormGroup row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button type="button" color="danger" onClick={this.onCancelarClick} tabIndex={-1} >Cancelar</Button>
                            {' '}
                            <Button type="submit" color="primary" default>Salvar</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}