const usuario = { id: 123, nome: 'Douglas' };
const tarefa = { id: 15, titulo: 'Minha tarefa' };

// Cria a promise que irá inserir o usuário no banco de dados
const promiseUsuario = inserir(usuario);
console.log('Cria a promise que irá inserir o usuário.')

promiseUsuario.then(function (usuario) {
    console.log('Usuário inserido:', usuario);
    // aqui eu tenho o usuário inserido
    return usuario.id;
}).then(function (usuarioId) {
    console.log('Atribui o ID do usuário inserido à tarefa.');
    tarefa.usuarioId = usuarioId;
    return inserir(tarefa);
}).then(function (tarefa) {
    // aqui eu tenho a tarefa inserida e vinculada ao usuário
    console.log('Tarefa inserida:', tarefa);
}).catch(function (error) {
    console.error('Ocorreu um erro:', error);
});

/**
 * Função que simula a inserção de elementos no banco de dados.
 * @param {object} entidade 
 */
function inserir(entidade) {
    return new Promise(function (resolve, reject) {

        // aqui estariam as chamadas assíncronas

        setTimeout(function () {

            resolve(entidade);

            //reject(new Error('Ocorreu um erro inesperado.'));

        }, 4000); // simula uma chamada assíncrona de 4 segundos para ser resolvida.

    })
}



