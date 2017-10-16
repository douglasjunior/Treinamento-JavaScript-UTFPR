import express from 'express';
import moment from 'moment';
import bcrypt from 'bcryptjs';

import { generateToken, checkTokenMiddleware } from '../utils/JWT';
import { createValidator } from '../utils/Validator';
import models from '../models';

const { Usuario, Tarefa } = models;

const router = express.Router();

module.exports = {
    router,
    path: '/usuarios'
};

const DATE_FORMAT = 'YYYY-MM-DD';
const SALT_ROUNDS = 12; // quanto mais rounds, mais seguro e mais lento para criptografar a senha

const USER_VALIDATOR = createValidator({
    nome: {
        in: 'body',
        notEmpty: true,
        isLength: {
            options: [{ min: 3, max: 200 }],
        },
    },
    email: {
        in: 'body',
        notEmpty: true,
        isEmail: true,
        isLength: {
            options: [{ max: 150 }],
        },
    },
    nascimento: {
        in: 'body',
        notEmpty: true,
        isDate: {
            options: DATE_FORMAT,
            errorMessage: `A data deve estar no formato ${DATE_FORMAT}`
        }
    },
    senha: {
        in: 'body',
        notEmpty: true,
        isLength: {
            options: [{ min: 6, max: 8 }],
        },
    }
});

/**
 * Cadastro de usuário
 */
router.post('/',
    USER_VALIDATOR,
    (request, response) => {
        const usuario = {
            nome: request.body.nome,
            email: request.body.email,
            nascimento: moment(request.body.nascimento, DATE_FORMAT, true),
            senha: bcrypt.hashSync(request.body.senha, SALT_ROUNDS) // criptografa a senha antes de salvar
        };

        Usuario.create(usuario)
            .then((_usuario) => {
                response.status(201).json(_usuario);
            }).catch(ex => {
                console.error(ex);
                response.status(400).send('Não foi possível inserir o usuário.');
            });
    });

/**
 * Consulta de usuário
 */
router.get('/:usuarioId',
    createValidator({
        usuarioId: {
            in: 'params',
            isInt: true,
            notEmpty: true,
        }
    }),
    checkTokenMiddleware,
    (request, response) => {
        const usuarioId = request.params.usuarioId;
        const usuarioIdToken = request.decodedToken.id;

        // Verifica se o ID do usuário logado é igual ao ID passado por parâmetro.
        if (usuarioId != usuarioIdToken) {
            response.status(401).send('Operação não autorizada.');
            return;
        }

        Usuario.findById(usuarioId, {
            include: [{
                model: Tarefa,
                required: false // true = inner join, false = left join
            }]
        }).then(usuario => {
            if (usuario) {
                response.status(200).json(usuario);
            } else {
                response.status(404).send('Usuário não encontrado.');
            }
        }).catch(ex => {
            console.error(ex);
            response.status(400).send('Não foi possível consultar o usuário.');
        });
    });

/**
* Alteração de usuário
*/
router.put('/:usuarioId',
    USER_VALIDATOR,
    checkTokenMiddleware,
    (request, response) => {
        const usuarioId = request.params.usuarioId;
        const usuarioIdToken = request.decodedToken.id;

        // Verifica se o ID do usuário logado é igual ao ID passado por parâmetro.
        if (usuarioId != usuarioIdToken) {
            response.status(401).send('Operação não autorizada.');
            return;
        }

        Usuario.findById(usuarioId)
            .then(usuario => {
                if (usuario) {
                    usuario.nome = request.body.nome;
                    usuario.email = request.body.email;
                    usuario.nascimento = moment(request.body.nascimento, DATE_FORMAT, true);
                    usuario.senha = bcrypt.hashSync(request.body.senha, SALT_ROUNDS) // criptografa a senha antes de salvar
                    return usuario.save();
                } else {
                    response.status(404).send('Usuário não encontrado.');
                }
            }).then(usuarioAtualizado => {
                if (usuarioAtualizado) {
                    const _usuario = usuarioAtualizado.get({ plain: true });
                    delete _usuario.senha;
                    response.status(200).json(_usuario);
                }
            }).catch(ex => {
                console.error(ex);
                response.status(400).send('Não foi possível alterar os dados do usuário.');
            });
    });

/**
* Login de usuários
*/
router.post('/login',
    createValidator({
        email: {
            in: 'body',
            notEmpty: true,
            isEmail: true,
        },
        senha: {
            in: 'body',
            notEmpty: true
        }
    }),
    (request, response) => {
        const { email, senha } = request.body;

        Usuario.findOne({
            attributes: {},
            where: {
                email: email
            }
        }).then(usuario => {
            if (usuario && bcrypt.compareSync(senha, usuario.senha.toString())) {
                const _usuario = usuario.get({ plain: true });
                delete _usuario.senha; // remove o atributo da senha do objeto
                response.status(200).json({
                    token: generateToken(_usuario)
                })
            } else {
                response.status(401).send('Email ou senha incorretos.');
            }
        }).catch(ex => {
            console.error(ex);
            response.status(400).send('Não foi possível efetuar o login.');
        })
    });
