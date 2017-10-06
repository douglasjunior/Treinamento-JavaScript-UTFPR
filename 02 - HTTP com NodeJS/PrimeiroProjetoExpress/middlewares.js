const express = require('express');
const server = express();
const port = 3000;

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const expressValidator = require('express-validator');
server.use(expressValidator());

server.use((request, response, next) => {
    const token = request.query.token;
    if (token) {
        next();
    } else {
        response.status(401).send();
    }
})

server.get('/', (request, response) => {
    response.status(200).send('Olá Express!!');
});

server.post('/',
    (request, response, next) => {
        request.check({
            nome: {
                in: 'body',
                notEmpty: true,
            },
            idade: {
                in: 'body',
                isInt: {
                    options: {
                        min: 0,
                        max: 30
                    }
                },
                errorMessage: 'A idade deve ser entre 0 e 30.'
            }
        });
        request.getValidationResult()
            .then((result) => {
                if (result.isEmpty()) {
                    next();
                } else {
                    response.status(400).json(result.array());
                }
            }).catch(next);
    },
    (request, response) => {
        console.log('Conteúdo da requisição', request.body);
        response.status(201).send();
    });

server.listen(port, () => {
    console.log('Express iniciado na porta', port);
})