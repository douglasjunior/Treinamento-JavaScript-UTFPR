const http = {
    listen: function (port, callback) {
        setTimeout(function () {
            // Será executado todo o processo demorado de
            // iniciação do servidor.
            callback();
        }, 4000);
    }
};

console.log('Antes da chamada do listen.', new Date());
http.listen(3000, function () {
    console.log('Servidor iniciado na porta 3000', new Date());
});
console.log('Depois da chamada do listen.', new Date());