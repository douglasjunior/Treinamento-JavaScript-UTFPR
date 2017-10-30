import React, { Component } from 'react';

import { Table, } from 'reactstrap';

import TarefaItem from './TarefaItem';

export default class TarefasTable extends Component {

    renderTarefa = (tarefa, index) => {
        return (
            <TarefaItem key={tarefa.id} tarefa={tarefa} {...this.props} />
        )
    }

    renderTarefas = () => {
        const { tarefas } = this.props;
        return tarefas.map(this.renderTarefa);
    }

    render() {
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Criada em</th>
                        <th>Concluída</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTarefas()}
                </tbody>
            </Table>
        );
    }
}