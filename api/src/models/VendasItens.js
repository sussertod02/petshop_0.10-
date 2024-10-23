const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VendaItem = sequelize.define('VendaItem', {
  vendaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'vendas',
      key: 'id'
    }
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos',
      key: 'id'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precoUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0 
  }
}, {
  tableName: 'vendas_itens'
});

// Movemos as associações para um método que será chamado depois
VendaItem.associate = function(models) {
  VendaItem.belongsTo(models.Venda, { foreignKey: 'vendaId' });
  VendaItem.belongsTo(models.Produto, { foreignKey: 'produtoId' });
};

module.exports = VendaItem;