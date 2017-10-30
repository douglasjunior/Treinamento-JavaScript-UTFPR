import React, { Component } from 'react';

import axios from 'axios';

import TarefasTable from '../components/TarefasTable'

export default class TarefasPage extends Component {

    state = { tarefas: [] };

    componentDidMount() {
        axios.get('/tarefas')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        tarefas: response.data
                    })
                }
            }).catch(ex => {
                console.error(ex, ex.response);
            })
    }

    onConcluidaChange = (tarefaId, concluida) => {
        let axiosMethod;
        if (concluida) {
            axiosMethod = axios.put;
        } else {
            axiosMethod = axios.delete;
        }
        axiosMethod('/tarefas/concluida/' + tarefaId)
            .then(response => {
                if (response.status === 204) {
                    const tarefas = [...this.state.tarefas];
                    const tarefa = tarefas.find(tarefa => tarefa.id === tarefaId);
                    tarefa.concluida = concluida;
                    this.setState({ tarefas });
                }
            }).catch(ex => {
                console.error(ex);
            })
    }

    onEditarClick = (tarefaId) => {

    }

    onExcluirClick = (tarefaId) => {

    }

    render() {
        const { tarefas } = this.state;
        return (
            <div>
                <h2>Tarefas</h2>

                <TarefasTable tarefas={tarefas}
                    onConcluidaChange={this.onConcluidaChange}
                    onExcluirClick={this.onExcluirClick}
                    onEditarClick={this.onEditarClick} />
            </div>
        )
    }
}