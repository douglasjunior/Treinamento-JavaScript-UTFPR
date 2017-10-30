import React, { Component } from 'react';

import {
  Container,
  Form, FormGroup,
  Label, Col, Input,
  Button,
} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';

import InputForm from '../components/InputForm';

export default class UsuarioPage extends Component {

  state = {};

  onInputChange = (event) => {
    const { id, value } = event.target;
    const state = {};
    state[id] = value;
    this.setState(state);
  }

  onNomeValidate = (nome) => {
    return !!nome && nome.length >= 3 && nome.length <= 200;
  }

  onEmailValidate = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onSenhaValidate = (senha) => {
    return !!senha && senha.length >= 6 && senha.length <= 8;
  }

  onNascimentoValidate = (nascimento) => {
    return moment(nascimento, 'DD/MM/YYYY', true).isValid();
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.isFormValid(this.refs)) {
      this.postUsuario();
    }
  }

  isFormValid = (refs) => {
    const formValid = Object.keys(refs) // ['container', 'inputNome', 'inputSenha', ...];
      .map(refName => refs[refName]) // [Container(container), InputForm(inputNome), InputForm(inputSenha), ...]
      .filter(component => component instanceof InputForm) // [InputForm(inputNome), InputForm(inputSenha), ...]
      .reduce((previousValid, input) => {
        return input.isValid() && previousValid;
      }, true);
    return formValid;
  }

  postUsuario = () => {
    const { nome, email, senha, nascimento } = this.state;

    // nascimento = DD/MM/YYYY => YYYY-MM-DD
    axios.post('/usuarios', {
      nome, email, senha,
      nascimento: moment(nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }).then(response => {
      if (response.status === 201) {
        alert('Usuário incluído com sucesso!');
        this.props.history.push('/login');
      }
    }).catch(ex => {
      console.error(ex);
      console.error(ex.response);
      alert('Não foi possível incluir o usuário, verifique os dados informados.');
    });
  }

  onCancelarClick = (event) => {
    this.props.history.push('/login');
  }

  render() {
    const { nome, email, senha, nascimento } = this.state;
    return (
      <Container ref="container">
        <h2>Cadastro de usuário</h2>
        <Form onSubmit={this.onFormSubmit}>
          <InputForm label="Nome" id="nome" ref="inputNome" required={true} value={nome}
            onChange={this.onInputChange} errorMessage="O nome é obrigatório."
            validator={this.onNomeValidate} />

          <InputForm label="E-mail" id="email" ref="inputEmail" required={true} value={email}
            onChange={this.onInputChange} errorMessage="Informe um e-mail válido."
            validator={this.onEmailValidate} />

          <InputForm label="Senha" id="senha" ref="inputSenha" required={true} value={senha}
            onChange={this.onInputChange} type="password"
            errorMessage="A senha deve conter entre 6 e 8 caracteres."
            validator={this.onSenhaValidate} />

          <InputForm label="Nascimento" id="nascimento" ref="inputNascimento" required={true}
            value={nascimento} onChange={this.onInputChange} type="date"
            errorMessage="A data de nascimento deve estar no formato dd/mm/aaaa."
            validator={this.onNascimentoValidate} />

          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button color="danger" type="button"
                onClick={this.onCancelarClick}>Cancelar</Button>
              {' '}
              <Button color="primary">Salvar</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}