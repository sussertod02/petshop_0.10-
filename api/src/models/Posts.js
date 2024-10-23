const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metadescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
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
  tableName: 'posts'
});

Post.associate = function(models) {
  Post.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
};

module.exports = Post;