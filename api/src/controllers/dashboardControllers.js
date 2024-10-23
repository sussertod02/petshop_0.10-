const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');

//CARDS
//--QUANTIA DE PRODUTOS VENDIDOS

const dashboardController = {
  MaiorVenda: async (req, res) => {
    try {
      const limit = req.query.limite ? parseInt(req.query.limite) : 1;
      const currentYear = new Date().getFullYear();

      const query = `
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
          AND strftime('%Y', v.dataVenda) = :currentYear
        GROUP BY 
          c.id, c.nome
        ORDER BY 
          valorTotalCompras DESC, totalCompras DESC
        LIMIT :limit
      `;

      const clientes = await sequelize.query(query, {
        replacements: { currentYear: currentYear.toString(), limit },
        type: QueryTypes.SELECT
      });

      res.json(clientes);
    } catch (error) {
      console.error('Erro ao listar clientes que mais compraram no ano atual:', error);
      res.status(500).json({ 
        message: "Erro ao listar clientes que mais compraram no ano atual", 
        error: error.message 
      });
    }
  },

  MediaVenda: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();

      const query = `
        SELECT 
          AVG(v.valorTotal) AS mediaValorTotal
        FROM 
          vendas v
        WHERE 
          v.status = 'concluída'
          AND strftime('%Y', v.dataVenda) = :currentYear
      `;

      const result = await sequelize.query(query, {
        replacements: { currentYear: currentYear.toString() },
        type: QueryTypes.SELECT
      });

      res.json([result[0]]);
    } catch (error) {
      console.error('Erro ao calcular a média das vendas no ano atual:', error);
      res.status(500).json({ 
        message: "Erro ao calcular a média das vendas no ano atual", 
        error: error.message 
      });
    }
  },

  VendasTotaisPorAno: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear(); // Ano atual

      const query = `
        SELECT 
          strftime('%Y', v.dataVenda) AS ano,
          strftime('%Y/%m', v.dataVenda) AS label,
          SUM(v.valorTotal) AS data
        FROM 
          vendas v
        WHERE 
          v.status = 'concluída'
          AND strftime('%Y', v.dataVenda) = :currentYear
        GROUP BY 
          strftime('%Y/%m', v.dataVenda)
        ORDER BY 
          strftime('%Y/%m', v.dataVenda)
      `;

      const vendasTotais = await sequelize.query(query, {
        replacements: { currentYear: currentYear.toString() },
        type: QueryTypes.SELECT
      });

      res.json(vendasTotais);
    } catch (error) {
      console.error('Erro ao obter vendas totais do ano atual:', error);
      res.status(500).json({ 
        message: "Erro ao obter vendas totais do ano atual", 
        error: error.message 
      });
    }
  },
//graficos
  VendasPorCategoria: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear(); // Ano atual

      const query = `
        SELECT 
        c.nome AS categoriaNome,
        SUM(vi.quantidade * vi.precoUnitario) AS totalCategoria,
        (SUM(vi.quantidade * vi.precoUnitario) / 
        (SELECT SUM(v.valorTotal) 
        FROM vendas v 
        WHERE v.status = 'concluída' 
        AND strftime('%Y', v.dataVenda) = '2024')) * 100 AS percentual
        FROM 
        categorias c
        JOIN 
        produtos p ON c.id = p.categoriaId
        JOIN 
        vendas_itens vi ON p.id = vi.produtoId
        JOIN 
        vendas v ON vi.vendaId = v.id
        WHERE 
        v.status = 'concluída'
        AND strftime('%Y', v.dataVenda) = :currentYear
        GROUP BY 
        c.id, c.nome
        ORDER BY 
        percentual DESC;
      `;

      const VendasPorCategoria = await sequelize.query(query, {
        replacements: { currentYear: currentYear.toString() },
        type: QueryTypes.SELECT
      });

      res.json(VendasPorCategoria);
    } catch (error) {
      console.error('Erro ao obter vendas por categoria do ano atual:', error);
      res.status(500).json({ 
        message: "Erro ao obter vendas por categoria do ano atual", 
        error: error.message 
      });
    }
  },

  Top10clientes: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear(); // Ano atual

      const query = `
        SELECT 
        c.id AS clienteId,
        c.nome AS clienteNome,
        COUNT(v.id) AS totalCompras,
        SUM(v.valorTotal) AS valorTotalCompras
        FROM 
        clientes c
        JOIN 
        vendas v ON c.id = v.clienteId
        WHERE 
        v.status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear
        GROUP BY 
        c.id, c.nome
        ORDER BY 
        valorTotalCompras DESC
        LIMIT 10;
      `;

      const Top10clientes = await sequelize.query(query, {
        replacements: { currentYear: currentYear.toString() },
        type: QueryTypes.SELECT
      });

      res.json(Top10clientes);
    } catch (error) {
      console.error('Erro ao obter top 10 melhores clientes do ano atual:', error);
      res.status(500).json({ 
        message: "Erro ao obter top 10 melhores clientes do ano atual", 
        error: error.message 
      });
    }
  },
//cards
  ProdutoMaiorReceita: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear(); // Ano atual

      const query = `
        SELECT p.nome AS produtoNome, SUM(vi.quantidade * vi.precoUnitario) AS receitaTotal
        FROM produtos p
        JOIN vendas_itens vi ON p.id = vi.produtoId
        JOIN vendas v ON vi.vendaId = v.id
        WHERE v.status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear
        GROUP BY p.id, p.nome
        ORDER BY receitaTotal DESC
        LIMIT 1;
      `;

      const ProdutoMaiorReceita = await sequelize.query(query, {
        replacements: { currentYear: currentYear.toString() },
        type: QueryTypes.SELECT
      });

      res.json(ProdutoMaiorReceita);
    } catch (error) {
      console.error('Erro ao obter produto com maior receita do ano atual:', error);
      res.status(500).json({ 
        message: "Erro ao obter produto com maior receita do ano atual", 
        error: error.message 
      });
    }
  },

  QuantiaProdutoVendido: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear(); // Ano atual

      const query = `
        SELECT SUM(vi.quantidade) AS totalProdutosVendidos
        FROM vendas_itens vi
        JOIN vendas v ON vi.vendaId = v.id
        WHERE v.status = 'concluída' AND strftime('%Y', v.dataVenda) = :currentYear;
      `;

      const QuantiaProdutoVendido = await sequelize.query(query, {
        replacements: { currentYear: currentYear.toString() },
        type: QueryTypes.SELECT
      });

      res.json(QuantiaProdutoVendido);
    } catch (error) {
      console.error('Erro ao obter quantia de produtos do ano atual:', error);
      res.status(500).json({ 
        message: "Erro ao obter quantia de produtos do ano atual", 
        error: error.message 
      });
    }
  },

};


module.exports = dashboardController;