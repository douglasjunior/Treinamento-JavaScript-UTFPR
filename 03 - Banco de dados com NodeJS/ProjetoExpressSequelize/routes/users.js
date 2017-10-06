const express = require('express');
const router = express.Router();
const models = require('../models');
const Usuario = models.Usuario;

router.post('/', (request, response) => {
    const usuario = {
        nome: request.body.nome,
        email: request.body.email,
    }

    Usuario.create(usuario)
        .then((_usuario) => {
            console.log('Usuário inserido com sucesso');
            response.status(201).json(_usuario);
        })
        .catch(ex => {
            console.error(ex);
            response.status(400).send();
        });
});

router.get('/:usuarioId', (request, response) => {
    const usuarioId = request.params.usuarioId;

    Usuario.findById(usuarioId)
        .then(usuario => {
            if (usuario) {
                response.status(200).json(usuario);
            } else {
                response.status(404).send('Usuário não encontrado.');
            }
        }).catch(ex => {
            console.error(ex);
            response.status(400).send();
        });
});

router.put('/:usuarioId', (request, response) => {
    const usuarioId = request.params.usuarioId;

    const usuario = {
        nome: request.body.nome,
        email: request.body.email,
    };

    Usuario.update(usuario, {
        where: {
            id: usuarioId
        }
    }).then(resultado => {
        console.log("Update realizado", resultado);
        const registrosAfetados = resultado[0];
        if (registrosAfetados > 0) {
            return Usuario.findById(usuarioId);
        } else {
            response.status(404).send('Usuário não encontrado.');
        }
    }).then(usuario => {
        if (usuario) {
            response.status(200).json(usuario);
        }
    }).catch(ex => {
        console.error(ex);
        response.status(400).send();
    });
});

//http://localhost:3000/users/10/tarefas/5
//router.delete('/:usuarioId/tarefas/:tarefaId', (request, response) => {

router.delete('/:usuarioId', (request, response) => {
    const usuarioId = request.params.usuarioId;

    Usuario.destroy({
        where: {
            id: usuarioId
        }
    }).then(registrosAfetados => {
        console.log('Usuários removidos', registrosAfetados);
        if (registrosAfetados > 0) {
            response.status(204).send();
        } else {
            response.status(404).send('Usuário não encontrado.');
        }
    }).catch(ex => {
        console.error(ex);
        response.status(400).send();
    })
});

// http://localhost:3000/user?nome=douglas

router.get('/', (request, response) => {
    const nome = request.query.nome;

    Usuario.findAll({
        attributes: ['id', 'nome', 'email'],
        where: {
            nome: {
                $like: '%' + nome + '%'
            }
        }
    }).then(usuarios => {
        response.status(200).json(usuarios);
    }).catch(ex => {
        console.error(ex);
        response.status(400).send();
    })
});

module.exports = router;
