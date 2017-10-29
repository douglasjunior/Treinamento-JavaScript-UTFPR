import React, { Component } from 'react';

import { Prompt } from 'react-router-dom';

export default class Form extends Component {

    state = { nome: '', sobreNome: '', editando: false };

    onValueChange = (event) => {
        const { name, value } = event.target;
        const state = {};
        state[name] = value;
        state.editando = true;
        this.setState(state);
    }

    renderErrorMessage = (inputName, errorMessage) => {
        const value = this.state[inputName];
        if (value) return null;
        return <span>{errorMessage}</span>;
    }

    render() {
        const { nome,sobreNome, editando } = this.state;
        return (
            <div>
                <label>Nome</label>
                <input type="text" name="nome" value={nome} onChange={this.onValueChange} />
                {this.renderErrorMessage('nome', 'Preencha o nome')}
                
                <br />

                <label>Sobrenome</label>
                <input type="text" name="sobreNome" value={sobreNome} onChange={this.onValueChange} />
                {this.renderErrorMessage('sobreNome', 'Preencha o sobrenome')}


                <Prompt when={editando}
                    message="Deseja sair do formulário?"
                />
            </div>
        )
    }
}