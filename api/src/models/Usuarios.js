const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'O nome é obrigatório' },
      len: {
        args: [2, 50],
        msg: 'O nome deve ter entre 2 e 50 caracteres'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'O email já está em uso'
    },
    validate: {
      notNull: { msg: 'O email é obrigatório' },
      isEmail: { msg: 'Formato de email inválido' }
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9]*$/,
        msg: 'O telefone deve conter apenas números'
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'A senha é obrigatória' },
      len: {
        args: [6, 100],
        msg: 'A senha deve ter pelo menos 6 caracteres'
      }
    }
  },
  perfilId: {
    type: DataTypes.STRING,
    references: {
      model: 'perfis',
      key: 'id'
    }
  }
}, {
  tableName: 'usuarios'
});

Usuario.associate = function(models) {
  Usuario.belongsTo(models.Perfil, { foreignKey: 'perfilId', as: 'perfil' });
};

module.exports = Usuario;