import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container } from 'reactstrap';

import UsuarioPage from './pages/UsuarioPage';

class App extends Component {
  render() {
    return (
      <Container>
        <UsuarioPage />
      </Container>
    );
  }
}

export default App;
