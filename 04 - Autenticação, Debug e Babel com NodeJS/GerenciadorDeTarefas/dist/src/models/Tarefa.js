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
    var Tarefa = sequelize.define('tarefa', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT
        },
        titulo: {
            allowNull: false,
            type: DataTypes.STRING(200)
        },
        descricao: DataTypes.TEXT,
        concluida: DataTypes.BOOLEAN
    });

    /**
     * @param {Object.<string, Sequelize.Model>} models
     */
    Tarefa.associate = function (models) {
        var Usuario = models.Usuario;

        // Define a associação de que a tarefa pertence ao usuário

        Tarefa.belongsTo(Usuario, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        });
    };

    return Tarefa;
};
//# sourceMappingURL=Tarefa.js.map