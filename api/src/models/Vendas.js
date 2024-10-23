const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venda = sequelize.define('Venda', {
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'id'
    }
  },
  dataVenda: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
    allowNull: false,
    defaultValue: 'pendente'
  }
}, {
  tableName: 'vendas'
});

// Movemos a associação para um método que será chamado depois
Venda.associate = function(models) {
  Venda.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
};

module.exports = Venda;