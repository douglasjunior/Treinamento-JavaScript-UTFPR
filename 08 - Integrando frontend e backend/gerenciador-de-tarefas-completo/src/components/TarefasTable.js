import React, { Component } from 'react';

import moment from 'moment';
import {
    Table, ButtonGroup, Button
} from 'reactstrap';

export default class TarefasTable extends Component {

    renderTarefa = (tarefa, index) => {
        const { onConcluidaChange, onExcluirClick, onEditarClick } = this.props;
        return (
            <tr key={tarefa.id}>
                <th scope="row">{tarefa.id}</th>
                <td>{tarefa.titulo}</td>
                <td>{moment(tarefa.createdAt).format('DD/MM/YYYY [às] HH:mm')}</td>
                <td>
                    <ButtonGroup>
                        <Button color={!tarefa.concluida ? 'primary' : 'secondary'} onClick={() => onConcluidaChange(tarefa.id, false)}>Pendente</Button>
                        <Button color={tarefa.concluida ? 'primary' : 'secondary'} onClick={() => onConcluidaChange(tarefa.id, true)}>Concluída</Button>
                    </ButtonGroup>
                </td>
                <td>
                    <ButtonGroup>
                        <Button color='warning' onClick={() => onEditarClick(tarefa.id)}>Editar</Button>
                        <Button color="danger" onClick={() => onExcluirClick(tarefa.id)}>Excluir</Button>
                    </ButtonGroup>
                </td>
            </tr>
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