const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');


const vendasController = {
  clientesMaisCompras: async (req, res) => {
    try {
      const limit = req.query.limite ? parseInt(req.query.limite) : 2;
      const dataInicio = req.query.dataInicio ? new Date(req.query.dataInicio) : null;
      const dataFim = req.query.dataFim ? new Date(req.query.dataFim) : null;

      let query = `
        SELECT 
          c.id AS clienteId,
          c.nome AS clienteNome,
          COUNT(v.id) AS totalCompras,
          SUM(v.valorTotal) AS valorTotalCompras
        FROM 
          clientes c
        LEFT JOIN 
          vendas v ON c.id = v.clienteId
        WHERE 
          v.status = 'concluída'
      `;

      if (dataInicio && dataFim) {
        query += ` AND v.dataVenda BETWEEN :dataInicio AND :dataFim`;
      }

      query += `
        GROUP BY 
          c.id, c.nome
        ORDER BY 
          valorTotalCompras DESC, totalCompras DESC
        LIMIT :limit
      `;

      const clientes = await sequelize.query(query, {
        replacements: { dataInicio, dataFim, limit },
        type: QueryTypes.SELECT
      });

      res.json(clientes);
    } catch (error) {
      console.error('Erro ao listar clientes que mais compraram:', error);
      res.status(500).json({ 
        message: "Erro ao listar clientes que mais compraram", 
        error: error.message 
      });
    }
  }
};




module.exports = vendasController;