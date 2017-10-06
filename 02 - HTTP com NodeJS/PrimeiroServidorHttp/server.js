const http = require('http');
const port = 3000;

http.createServer((request, response) => {
    console.log(request.url);

    if (request.url.startsWith('/usuarios')) {
        const usuario = {
            nome: 'Douglas Junior',
            profissao: 'Programador'
        };

        const corpoResposta = JSON.stringify(usuario);

        response.setHeader('content-type',
            'application/json; charset=utf-8');
        response.writeHead(200);
        response.write(corpoResposta);
    } else {
        response.writeHead(404);
    }
    response.end();

}).listen(port, () => {
    console.log('Servidor iniciado na porta', port);
}); 