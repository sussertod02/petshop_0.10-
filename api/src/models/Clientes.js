const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "O e-mail deve ser um endereço de e-mail válido"
      }
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'clientes'
});

Cliente.associate = function(models) {
  Cliente.hasMany(models.Pet, { foreignKey: 'clienteId', as: 'pets' });
};

module.exports = Cliente;