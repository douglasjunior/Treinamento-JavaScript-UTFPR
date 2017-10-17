import fs from 'fs';
import path from 'path';
import Sequelize, { Op } from 'sequelize';
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
config.operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

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

export default db;
