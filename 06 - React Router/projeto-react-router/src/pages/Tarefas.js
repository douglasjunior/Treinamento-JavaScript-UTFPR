import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';

const TAREFAS = [{
    id: 1,
    titulo: 'Tarefa 1',
    descricao: 'Descrição 1'
}, {
    id: 2,
    titulo: 'Tarefa 2',
    descricao: 'Descrição 2'
}, {
    id: 3,
    titulo: 'Tarefa 3',
    descricao: 'Descrição 3'
}, {
    id: 4,
    titulo: 'Tarefa 4',
    descricao: 'Descrição 4'
}, {
    id: 5,
    titulo: 'Tarefa 5',
    descricao: 'Descrição 5'
}];

// const TAREFA_JSX = [
//     <li>
//         <Link to={`/tarefas/${tarefa.id}`} >
//             {tarefa.titulo}
//         </Link>
//     </li>,
//     <li>
//         <Link to={`/tarefas/${tarefa.id}`} >
//             {tarefa.titulo}
//         </Link>
//     </li>,
//     <li>
//         <Link to={`/tarefas/${tarefa.id}`} >
//             {tarefa.titulo}
//         </Link>
//     </li>
// ]

export default class Tarefas extends Component {

    render() {
        return (
            <div>
                <h2>Tarefas</h2>
                <div className="" style={{
                    display: 'flex',
                    flexDirection: 'row'
                }} >
                    <div style={{ width: '300px' }}>
                        <h3>Lista</h3>
                        <ul>
                            {TAREFAS.map((tarefa) => {
                                return (
                                    <li key={tarefa.id} >
                                        <Link to={`/tarefas/${tarefa.id}`} >
                                            {tarefa.titulo}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div style={{ width: '500px' }}>
                        <h3>Detalhes</h3>
                        <Route path="/tarefas/:tarefaId" render={(props) => {
                            const { tarefaId } = props.match.params;
                            const tarefa = TAREFAS.find((tarefa) => {
                                return tarefa.id === parseInt(tarefaId, 10);
                            });
                            if (!tarefa) return null;
                            return (
                                <div>
                                    <h4>{tarefa.id}: {tarefa.titulo}</h4>
                                    <p>{tarefa.descricao}</p>
                                </div>
                            )
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}