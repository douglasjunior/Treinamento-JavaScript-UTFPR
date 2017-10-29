import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';

const PESSOAS = [
    { id: 1, nome: 'Douglas', amigos: [2, 3, 4] },
    { id: 2, nome: 'João', amigos: [1] },
    { id: 3, nome: 'José', amigos: [1, 4] },
    { id: 4, nome: 'Carlos', amigos: [1, 3] }
]

export default class Amigos extends Component {

    findPessoa = (pessoaId) => {
        const pessoa = PESSOAS.find((pessoa) => {
            return pessoa.id === parseInt(pessoaId, 10);
        })
        return pessoa;
    }

    render() {
        const { match } = this.props;
        const { pessoaId } = match.params;
        const pessoa = this.findPessoa(pessoaId || 1);
        return (
            <div>
                <h3>Amigos do {pessoa.nome}</h3>

                <ul>
                    {pessoa.amigos.map((amigoId) => {
                        const amigo = this.findPessoa(amigoId);
                        return (
                            <li>
                                <Link to={match.url + '/' + amigo.id} >
                                    {amigo.nome}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <Route path={match.url + '/:pessoaId'} component={Amigos} />
            </div>
        )
    }
}