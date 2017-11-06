import Sequelize from 'sequelize';

/**
 * @param {Sequelize.Sequelize} sequelize 
 * @param {Sequelize.DataTypes} DataTypes 
 * @return {Sequelize.Model}
 */
module.exports = function (sequelize, DataTypes) {
    const Usuario = sequelize.define('usuario', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
        },
        nome: {
            allowNull: false,
            type: DataTypes.STRING(200),
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(150),
        },
        senha: {
            allowNull: false,
            type: DataTypes.BLOB,
        },
        nascimento: DataTypes.DATEONLY,
    }, {
            defaultScope: {
                attributes: {
                    exclude: ['senha'] // por padrão, exclui a senha do resultados das consultas
                }
            },
        }
    );

    /**
     * @param {Object.<string, Sequelize.Model>} models
     */
    Usuario.associate = (models) => {
        const { Tarefa } = models;

        // Define a associação de um usuário para muitas tarefas
        Usuario.hasMany(Tarefa, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    }

    return Usuario;
}