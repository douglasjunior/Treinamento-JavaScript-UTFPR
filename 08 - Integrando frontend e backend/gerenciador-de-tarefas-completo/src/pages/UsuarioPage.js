import React, { Component } from 'react';

import {
    Form, FormGroup,
    Col, Button,
    Container,
} from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

import InputForm from '../components/InputForm';

const DATE_FORMAT = 'DD/MM/YYYY';

export default class UsuarioPage extends Component {

    state = {};

    onFormSubmit = (event) => {
        event.preventDefault();

        if (this.isFormValid()) {
            alert('Válido');
        } else {
            alert('Inválido');
        }

    }

    isFormValid = () => {
        return Object.keys(this.refs)
            .map(ref => this.refs[ref])
            .filter(element => element instanceof InputForm)
            .reduce(((previousValid, input) => {
                return input.isValid() && previousValid;
            }), true)
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

    validateEmail = (value) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value);
    }

    validateSenha = (value) => {
        return !!value && value.length > 6;
    }

    validateNascimento = (value) => {
        return moment(value, DATE_FORMAT, true).isValid();
    }

    render() {
        const { nome, email, senha, nascimento } = this.state;
        return (
            <Container>
                <Form onSubmit={this.onFormSubmit} style={{ marginTop: 20 }}>
                    <InputForm label="Nome" id="nome" ref="nome" value={nome} onChange={this.onInputChange} required={true}
                        validator={value => !!value} errorMessage="O nome é obrigatório." />
                    <InputForm label="E-mail" id="email" ref="email" value={email} onChange={this.onInputChange} required={true}
                        validator={this.validateEmail} errorMessage="Informe um e-mail válido." />
                    <InputForm label="Senha" id="senha" ref="senha" value={senha} onChange={this.onInputChange} type="password" required={true}
                        validator={this.validateSenha} errorMessage="A senha deve conter no mínimo 6 caracteres." />
                    <InputForm label="Nascimento" id="nascimento" ref="nascimento" value={nascimento} onChange={this.onInputChange} type="date" dateFormat={DATE_FORMAT} required={true}
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