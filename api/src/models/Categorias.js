const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O nome não pode ser vazio"
      },
      len: {
        args: [3, 255],
        msg: "O nome deve ter entre 3 e 255 caracteres"
      }
    }
  }
}, {
  tableName: 'categorias'
});

Categoria.associate = function(models) {
  Categoria.hasMany(models.Subcategoria, { foreignKey: 'categoriaId', as: 'subcategorias' });
  Categoria.hasMany(models.Post, { foreignKey: 'categoriaId', as: 'posts' });
  Categoria.hasMany(models.Produto, { foreignKey: 'categoriaId', as: 'produtos' });
};

module.exports = Categoria;