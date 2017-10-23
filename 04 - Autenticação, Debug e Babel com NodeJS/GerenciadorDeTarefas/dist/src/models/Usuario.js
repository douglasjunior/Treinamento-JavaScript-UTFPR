'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Sequelize.Sequelize} sequelize 
 * @param {Sequelize.DataTypes} DataTypes 
 * @return {Sequelize.Model}
 */
module.exports = function (sequelize, DataTypes) {
    var Usuario = sequelize.define('usuario', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        nome: {
            allowNull: false,
            type: DataTypes.STRING(200)
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(150)
        },
        senha: {
            allowNull: false,
            type: DataTypes.BLOB
        },
        nascimento: DataTypes.DATEONLY
    }, {
        defaultScope: {
            attributes: {
                exclude: ['senha'] // por padrão, exclui a senha do resultados das consultas
            }
        }
    });

    /**
     * @param {Object.<string, Sequelize.Model>} models
     */
    Usuario.associate = function (models) {
        var Tarefa = models.Tarefa;

        // Define a associação de um usuário para muitas tarefas

        Usuario.hasMany(Tarefa, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        });
    };

    return Usuario;
};
//# sourceMappingURL=Usuario.js.map