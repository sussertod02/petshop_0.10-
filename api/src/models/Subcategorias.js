const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subcategoria = sequelize.define('Subcategoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoriaId: {
    type: DataTypes.STRING,
    references: {
      model: 'categorias',
      key: 'id'
    }
  }
}, {
  tableName: 'subcategorias'
});

Subcategoria.associate = function(models) {
  Subcategoria.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
  Subcategoria.hasMany(models.Produto, { foreignKey: 'subcategoriaId', as: 'produtos' });
};

module.exports = Subcategoria;