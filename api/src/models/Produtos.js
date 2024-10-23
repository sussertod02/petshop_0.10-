const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categorias',
      key: 'id'
    }
  },
  subcategoriaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Subcategorias',
      key: 'id'
    }
  }
}, {
  tableName: 'produtos'
});

Produto.associate = function(models) {
  Produto.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
  Produto.belongsTo(models.Subcategoria, { foreignKey: 'subcategoriaId', as: 'subcategoria' });
};

module.exports = Produto;