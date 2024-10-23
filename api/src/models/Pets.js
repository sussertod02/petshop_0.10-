const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pet = sequelize.define('Pet', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clientes',
      key: 'id'
    }
  }
},{
  tableName: 'pets'
});

Pet.associate = function(models) {
  Pet.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
};

module.exports = Pet;