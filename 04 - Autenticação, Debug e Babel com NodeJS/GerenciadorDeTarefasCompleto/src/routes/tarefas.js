import express from 'express';

import { checkTokenMiddleware } from '../utils/JWT'
import { createValidator } from '../utils/Validator'
import models, { sequelize } from '../models';

const { Usuario, Tarefa } = models;

const router = express.Router();

module.exports = {
    router,
    path: '/tarefas'
};

const TAREFA_VALIDATOR = {
    titulo: {
        in: 'body',
        isLength: {
            options: [{ min: 1, max: 200 }],
        },
    },
    descricao: {
        in: 'body',
        optional: true
    },
};

router.post('/',
    createValidator(TAREFA_VALIDATOR),
    checkTokenMiddleware,
    (request, response) => {
        const usuarioId = request.decodedToken.id;

        const tarefa = {
            titulo: request.body.titulo,
            descricao: request.body.descricao,
            usuarioId: usuarioId,
            concluida: false,
        }

        Tarefa.create(tarefa)
            .then((_tarefa) => {
                response.status(201).json(_tarefa);
            })
            .catch(ex => {
                console.error(ex);
                response.status(400).send('Não foi possível incluir esta tarefa');
            });
    });

router.get('/:tarefaId',
    createValidator({
        tarefaId: {
            in: 'params',
            isInt: true,
            notEmpty: true,
        }
    }),
    checkTokenMiddleware,
    (request, response) => {
        const tarefaId = request.params.tarefaId;
        const usuarioId = request.decodedToken.id;

        Tarefa.findById(tarefaId, {
            include: [{
                model: Usuario,
                where: {
                    id: usuarioId
                }
            }]
        }).then(tarefa => {
            if (tarefa) {
                response.status(200).json(tarefa);
            } else {
                response.status(404).send('Tarefa não encontrada.');
            }
        }).catch(ex => {
            console.error(ex);
            response.status(400).send('Não foi possível consultar esta tarefa.');
        });
    });

router.put('/:tarefaId',
    createValidator({
        ...TAREFA_VALIDATOR,
        tarefaId: {
            in: 'params',
            isInt: true,
            notEmpty: true,
        }
    }),
    checkTokenMiddleware,
    (request, response) => {
        const tarefaId = request.params.tarefaId;
        const usuarioId = request.decodedToken.id;

        Tarefa.findById(tarefaId, {
            where: {
                usuarioId: usuarioId
            }
        }).then(tarefa => {
            if (tarefa) {
                tarefa.titulo = request.body.titulo;
                tarefa.descricao = request.body.descricao;
                return tarefa.save();
            } else {
                response.status(404).send('Tarefa não encontrada.');
            }
        }).then(tarefaAtualizada => {
            if (tarefaAtualizada) {
                response.status(200).json(tarefaAtualizada);
            }
        }).catch(ex => {
            console.error(ex);
            response.status(400).send('Não foi possível alterar os dados da tarefa.');
        });
    });

router.delete('/:tarefaId',
    createValidator({
        tarefaId: {
            in: 'params',
            isInt: true,
            notEmpty: true,
        }
    }),
    checkTokenMiddleware,
    (request, response) => {
        const tarefaId = request.params.tarefaId;
        const usuarioId = request.decodedToken.id;

        Tarefa.destroy({
            where: {
                id: tarefaId,
                usuarioId: usuarioId,
            },
        }).then(registrosAfetados => {
            if (registrosAfetados > 0) {
                response.status(204).send();
            } else {
                response.status(404).send('Tarefa não encontrada.');
            }
        }).catch(ex => {
            console.error(ex);
            response.status(400).send('Não foi possível remover esta tarefa.');
        })
    });

router.get('/',
    createValidator({
        titulo: {
            in: 'query',
            optional: true
        }
    }),
    checkTokenMiddleware,
    (request, response) => {
        const titulo = request.query.titulo;
        const usuarioId = request.decodedToken.id;

        let where = {
            usuarioId: usuarioId,
        }

        if (titulo) {
            where.titulo = {
                $like: '%' + titulo + '%'
            }
        }

        Tarefa.findAll({
            attributes: ['id', 'titulo', 'concluida', 'createdAt'],
            where: where
        }).then(tarefas => {
            response.status(200).json(tarefas);
        }).catch(ex => {
            console.error(ex);
            response.status(400).send('Não foi possível consultar as tarefas.');
        })
    });

router.delete('/concluida/:tarefaId',
    createValidator({
        tarefaId: {
            in: 'params',
            isInt: true,
            notEmpty: true,
        }
    }),
    checkTokenMiddleware,
    (request, response) => {
        const tarefaId = request.params.tarefaId;
        return concluirTarefa(tarefaId, false, response);
    });

router.put('/concluida/:tarefaId',
    createValidator({
        tarefaId: {
            in: 'params',
            isInt: true,
            notEmpty: true,
        }
    }),
    checkTokenMiddleware,
    (request, response) => {
        const tarefaId = request.params.tarefaId;
        return concluirTarefa(tarefaId, true, response);
    });

const concluirTarefa = (tarefaId, concluida, response) => {
    return Tarefa.update({
        concluida: concluida,
    }, {
            where: {
                id: tarefaId,
            },
        }
    ).then(registrosAfetados => {
        if (registrosAfetados > 0) {
            response.status(204).send();
        } else {
            response.status(404).send('Tarefa não encontrada.');
        }
    }).catch(ex => {
        console.error(ex);
        response.status(400).send('Não foi possível remover esta tarefa.');
    })
}