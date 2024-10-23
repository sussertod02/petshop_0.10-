const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Perfil = sequelize.define('Perfil', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'perfis'
});

Perfil.associate = function(models) {
  Perfil.hasMany(models.Usuario, { foreignKey: 'perfilId', as: 'usuarios' });
};

module.exports = Perfil;