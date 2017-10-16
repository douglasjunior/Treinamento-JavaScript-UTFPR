import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const debug = require('debug')('http:models');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

config.dialectOptions = {
    charset: 'UTF8' // define o charset do banco de dados
};
config.define = {
    freezeTableName: false, // permite plural no nome das tabelas
    timestamps: true, // permite a criação das colunas updatedAt e createdAt
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 * @type {Object.<string, Sequelize.Model>}
 */
const db = {};

fs.readdirSync(__dirname)
    .filter((file) => {
        // seleciona os arquivos com extensão .js
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const fileName = file.slice(0, -3);
        debug('Loading: ' + fileName);
        const model = sequelize.import(path.join(__dirname, file));
        db[fileName] = model;
    });

// Chama a função 'associate' de cada entidade para configurar os relacionamentos
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        debug('Associating: ' + modelName);
        db[modelName].associate(db);
    }
});

module.exports = {
    sequelize,
    Sequelize: sequelize,
    ...db
};