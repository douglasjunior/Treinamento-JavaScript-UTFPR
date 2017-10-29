import React, { Component } from 'react';

import {
  Form, FormGroup,
  Label, Col, Input
} from 'reactstrap';

export default class UsuarioPage extends Component {

  render() {
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label for="nome" sm={2}>Nome</Label>
            <Col sm={10}>
              <Input id="nome" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>E-mail</Label>
            <Col sm={10}>
              <Input />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Senha</Label>
            <Col sm={10}>
              <Input />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}