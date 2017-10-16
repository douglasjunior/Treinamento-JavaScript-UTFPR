import express from 'express';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { generateToken, checkTokenMiddleware } from '../utils/jwt'

import { Usuario } from '../models';

const router = express.Router();

module.exports = {
    router,
    path: '/usuarios'
};

const DATE_FORMAT = 'YYYY-MM-DD';
const SALT_ROUNDS = 12;

/**
 * Cadastro de usuário
 */
router.post('/', (request, response) => {
    const usuario = {
        nome: request.body.nome,
        email: request.body.email,
        nascimento: moment(request.body.nascimento, DATE_FORMAT, true),
        senha: bcrypt.hashSync(request.body.senha, SALT_ROUNDS) // criptografa a senha antes de salvar
    };

    Usuario.create(usuario)
        .then((_usuario) => {
            console.log('Usuário inserido com sucesso');
            response.status(201).json(_usuario.toResponse());
        }).catch(ex => {
            console.error(ex);
            response.status(400).send('Não foi possível inserir o usuário.');
        });
});

/**
 * Consulta de usuário
 */
router.get('/:usuarioId',
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
                    response.status(200).json(usuario.toResponse());
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
            }).then(usuario => {
                if (usuario) {
                    response.status(200).json(usuario.toResponse());
                }
            }).catch(ex => {
                console.error(ex);
                response.status(400).send('Não foi possível alterar os dados do usuário.');
            });
    });

/**
* Login de usuários
*/
router.post('/login', async (request, response) => {
    const { email, senha } = request.body;

    Usuario.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if (usuario && bcrypt.compareSync(senha, usuario.senha.toString())) {
            response.status(200).json({
                token: generateToken(usuario)
            })
        } else {
            response.status(401).send('Email ou senha incorretos.');
        }
    }).catch(ex => {
        console.error(ex);
        response.status(400).send('Não foi possível efetuar o login.');
    })
});
