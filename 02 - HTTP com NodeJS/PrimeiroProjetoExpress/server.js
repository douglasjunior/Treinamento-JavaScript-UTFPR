const express = require('express');
const server = express();
const port = 3000;

server.get('/usuarios', (request, response) => {
    const usuario = { nome: "Douglas" };
    response.status(200).json(usuario);
});

server.post('/usuarios', (request, response) => {
    let usuario = "";
    request.on('data', (chunk) => {
        console.log('dados recebidos:', chunk);
        usuario += chunk;
    });
    request.on('end', () => {
        console.log('Usuário recebido', usuario);
        response.status(201).send();
    });
});

server.listen(port, () => {
    console.log('Express iniciado na porta', port);
});