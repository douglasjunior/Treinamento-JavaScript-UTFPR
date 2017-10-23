import express from 'express';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import models from '../models';

const router = express.Router();
const { Usuario } = models;

router.post('/', (request, response) => {
    const usuario = {
        nome: request.body.nome,
        email: request.body.email,
        senha: bcrypt.hashSync(request.body.senha, 12),
        nascimento: moment(request.body.nascimento, 'YYYY-MM-DD', true),
    };
    Usuario.create(usuario)
        .then(usuario => {
            response.status(201).json(usuario);
        }).catch(ex => {
            console.error(ex);
            response.status(400).send();
        })
});

router.post('/login', (request, response) => {
    const { email, senha } = request.body;
    Usuario.findOne({
        attributes: null, // remove o defaultScope
        where: {
            email: email
        }
    }).then(usuario => {
        if (usuario && bcrypt.compareSync(senha, usuario.senha.toString())) {
            const _usuario = usuario.get({ plain: true });
            delete _usuario.senha;
            response.status(200).json({
                token: generateJWT(_usuario)
            });
        } else {
            response.status(401).send('Email ou senha incorretos.');
        }
    }).catch(ex => {
        console.error(ex);
        response.status(400).send();
    })
});

const checkAuth = (request, response, next) => {
    const token = request.headers['x-access-token'];
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        request.decodedToken = payload;
        next();
    } catch (ex) {
        response.status(401).send('Usuário não autorizado');
    }
};

// const checkPermission = (request, response, next) => {
//     const { url } = request;
//     const usuarioId = request.decodedToken.id;
//     Permissao.find({
//         url: url,
//         usuarioId: usuarioId
//     }).then(permissao => {
//         if (permissao.estado === 'AUTORIZADO') {
//             next();
//         } else {
//             response.status(401).send('Operação não autorizada');
//         }
//     }).catch(next);
// }

router.get('/:usuarioId', checkAuth, /*checkPermission,*/ (request, response) => {
    const { usuarioId } = request.params;
    if (usuarioId != request.decodedToken.id) {
        response.status(401).send('Operação não autorizada');
        return;
    }
    Usuario.findById(usuarioId)
        .then(usuario => {
            if (usuario) {
                response.status(200).json(usuario);
            } else {
                response.status(404).send();
            }
        }).catch(ex => {
            console.error(ex);
            response.status(400).send();
        })
})

const SECRET_KEY = 'VK|"+&rN=S`3[>/xbf#Q`LBsrX;E)y';

const generateJWT = (payload) => {
    const token = jwt.sign(payload, SECRET_KEY);
    return token;
}

export default {
    path: '/usuarios',
    router: router
};