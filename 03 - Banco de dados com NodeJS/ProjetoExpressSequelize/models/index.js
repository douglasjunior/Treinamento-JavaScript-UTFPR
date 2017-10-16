const Sequelize = require('sequelize');

const database = null, user = null, password = null;

const sequelize = new Sequelize(database, user, password, {
    // sqlite
    dialect: 'sqlite',
    storage: './database.sqlite',

    // mysql
    // host: '127.0.0.1',
    // port: 3306,
});

// sequelize.authenticate()
//     .then(() => {
//         console.log('Conectado com sucesso.');
//     }).catch(ex => {
//         console.error('Erro ao se conectar:', ex);
//     })

const Usuario = sequelize.define('usuario', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(200),
    },
    nascimento: Sequelize.DATEONLY,
    email: Sequelize.STRING(150),
});

const Tarefa = sequelize.define('tarefa', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
    },
    titulo: {
        allowNull: false,
        type: Sequelize.STRING(200),
    },
    descricao: Sequelize.TEXT
});

Usuario.hasMany(Tarefa, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
});

Tarefa.belongsTo(Usuario, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
});

module.exports = {
    sequelize,
    Usuario,
    Tarefa,
}