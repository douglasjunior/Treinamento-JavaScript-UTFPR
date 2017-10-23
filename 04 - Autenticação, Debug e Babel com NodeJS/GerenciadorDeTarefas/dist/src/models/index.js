'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sequelize = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('http:models');

var basename = _path2.default.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];

config.dialectOptions = {
    charset: 'UTF8' // define o charset do banco de dados
};
config.define = {
    freezeTableName: false, // permite plural no nome das tabelas
    timestamps: true // permite a criação das colunas updatedAt e createdAt
};
config.operatorsAliases = {
    $eq: _sequelize.Op.eq,
    $ne: _sequelize.Op.ne,
    $gte: _sequelize.Op.gte,
    $gt: _sequelize.Op.gt,
    $lte: _sequelize.Op.lte,
    $lt: _sequelize.Op.lt,
    $not: _sequelize.Op.not,
    $in: _sequelize.Op.in,
    $notIn: _sequelize.Op.notIn,
    $is: _sequelize.Op.is,
    $like: _sequelize.Op.like,
    $notLike: _sequelize.Op.notLike,
    $iLike: _sequelize.Op.iLike,
    $notILike: _sequelize.Op.notILike,
    $regexp: _sequelize.Op.regexp,
    $notRegexp: _sequelize.Op.notRegexp,
    $iRegexp: _sequelize.Op.iRegexp,
    $notIRegexp: _sequelize.Op.notIRegexp,
    $between: _sequelize.Op.between,
    $notBetween: _sequelize.Op.notBetween,
    $overlap: _sequelize.Op.overlap,
    $contains: _sequelize.Op.contains,
    $contained: _sequelize.Op.contained,
    $adjacent: _sequelize.Op.adjacent,
    $strictLeft: _sequelize.Op.strictLeft,
    $strictRight: _sequelize.Op.strictRight,
    $noExtendRight: _sequelize.Op.noExtendRight,
    $noExtendLeft: _sequelize.Op.noExtendLeft,
    $and: _sequelize.Op.and,
    $or: _sequelize.Op.or,
    $any: _sequelize.Op.any,
    $all: _sequelize.Op.all,
    $values: _sequelize.Op.values,
    $col: _sequelize.Op.col
};

var sequelize = exports.sequelize = new _sequelize2.default(config.database, config.username, config.password, config);

/**
 * @type {Object.<string, Sequelize.Model>}
 */
var db = {};

_fs2.default.readdirSync(__dirname).filter(function (file) {
    // seleciona os arquivos com extensão .js
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
    var fileName = file.slice(0, -3);
    debug('Loading: ' + fileName);
    var model = sequelize.import(_path2.default.join(__dirname, file));
    db[fileName] = model;
});

// Chama a função 'associate' de cada entidade para configurar os relacionamentos
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        debug('Associating: ' + modelName);
        db[modelName].associate(db);
    }
});

exports.default = db;
//# sourceMappingURL=index.js.map