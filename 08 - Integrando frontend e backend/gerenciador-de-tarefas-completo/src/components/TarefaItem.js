import React from 'react';

import moment from 'moment';
import {
    ButtonGroup, Button
} from 'reactstrap';

export default (props) => {
    const { tarefa, onConcluidaChange, onExcluirClick, onEditarClick } = props;
    return (
        <tr>
            <th scope="row">{tarefa.id}</th>
            <td>{tarefa.titulo}</td>
            <td>{moment(tarefa.createdAt).format('DD/MM/YYYY [às] HH:mm')}</td>
            <td>
                <ButtonGroup size="sm">
                    <Button color={!tarefa.concluida ? 'primary' : 'secondary'}
                        onClick={() => onConcluidaChange(tarefa.id, false)}>Pendente</Button>
                    <Button color={tarefa.concluida ? 'primary' : 'secondary'}
                        onClick={() => onConcluidaChange(tarefa.id, true)}>Concluída</Button>
                </ButtonGroup>
            </td>
            <td>
                <ButtonGroup size="sm">
                    <Button color='warning' onClick={() => onEditarClick(tarefa.id)}>Editar</Button>
                    <Button color="danger" onClick={() => onExcluirClick(tarefa.id)}>Excluir</Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}