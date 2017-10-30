import React from 'react';

import { getUsuario } from '../utils/LoginManager';

export default (props) => {
    const usuario = getUsuario();
    return (
        <div>
            <h2>Olá {usuario.nome}, bem vindo ao Gerenciador de Tarefas.</h2>
        </div>
    )
}