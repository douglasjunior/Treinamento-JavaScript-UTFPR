import Sequelize from 'sequelize';

/**
 * @param {Sequelize.Sequelize} sequelize 
 * @param {Sequelize.DataTypes} DataTypes 
 * @return {Sequelize.Model}
 */
module.exports = function (sequelize, DataTypes) {
    const Tarefa = sequelize.define('tarefa', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
        },
        titulo: {
            allowNull: false,
            type: DataTypes.STRING(200),
        },
        descricao: DataTypes.TEXT,
        concluida: DataTypes.BOOLEAN,
    });

    /**
     * @param {Object.<string, Sequelize.Model>} models
     */
    Tarefa.associate = (models) => {
        const { Usuario } = models;

        // Define a associação de que a tarefa pertence ao usuário
        Tarefa.belongsTo(Usuario, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    }

    return Tarefa;
}