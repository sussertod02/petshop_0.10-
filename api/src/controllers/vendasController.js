const { Sequelize } = require('sequelize');
const Venda = require('../models/Vendas');
const Cliente = require('../models/Clientes');

exports.clientesMaisCompras = async (req, res) => {
    try {
      const clientesMaisCompras = await Venda.findAll({
        attributes: [
          'clienteId',
          [Sequelize.fn('COUNT', Sequelize.col('Venda.id')), 'totalCompras'],
          [Sequelize.fn('SUM', Sequelize.col('Venda.valorTotal')), 'valorTotalCompras']
        ],
        include: [{
          model: Cliente,
          attributes: ['id', 'nome', 'email'],
          required: true
        }],
        group: ['Venda.clienteId', 'Cliente.id', 'Cliente.nome', 'Cliente.email'],
        order: [
          [Sequelize.literal('valorTotalCompras'), 'DESC'],
          [Sequelize.literal('totalCompras'), 'DESC']
        ],
        limit: 10
      });
  
      const resultadoFormatado = clientesMaisCompras.map(venda => ({
        id: venda.Cliente.id,
        nome: venda.Cliente.nome,
        email: venda.Cliente.email,
        totalCompras: parseInt(venda.getDataValue('totalCompras')),
        valorTotalCompras: parseFloat(venda.getDataValue('valorTotalCompras')).toFixed(2)
      }));
  
      res.json(resultadoFormatado);
    } catch (error) {
      console.error('Erro ao buscar clientes que mais compraram:', error);
      res.status(500).json({ 
        erro: 'Erro ao buscar clientes que mais compraram',
        detalhes: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
};