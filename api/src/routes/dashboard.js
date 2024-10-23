const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardControllers');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /dashboard/maior-venda:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Retorna o cliente que mais comprou no ano atual
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: O número de clientes a serem retornados, padrão é 1
 *     responses:
 *       200:
 *         description: Cliente(s) que mais comprou/compraram no ano atual
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   clienteId:
 *                     type: integer
 *                     description: ID do cliente
 *                   clienteNome:
 *                     type: string
 *                     description: Nome do cliente
 *                   totalCompras:
 *                     type: integer
 *                     description: Número total de compras do cliente
 *                   valorTotalCompras:
 *                     type: number
 *                     format: float
 *                     description: Valor total das compras do cliente
 *       500:
 *         description: Erro ao buscar o cliente que mais comprou
 */
router.get('/maior-venda', authenticateJWT, dashboardController.MaiorVenda);


/**
 * @swagger
 * /dashboard/media-vendas:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Calcula a média do valor total das vendas concluídas no ano atual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Média do valor total das vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mediaValorTotal:
 *                   type: number
 *                   format: float
 *                   description: Média do valor total das vendas concluídas
 *       500:
 *         description: Erro ao calcular a média das vendas
 */
router.get('/media-vendas', authenticateJWT, dashboardController.MediaVenda);

/**
 * @swagger
 * /dashboard/vendas-totais-ano-atual:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Retorna as vendas totais do ano atual por mês
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista das vendas totais por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ano:
 *                     type: string
 *                     description: Ano da venda
 *                   label:
 *                     type: string
 *                     description: Rótulo no formato ano/mês
 *                   data:
 *                     type: number
 *                     format: float
 *                     description: Total das vendas no mês
 *       500:
 *         description: Erro ao buscar vendas totais
 */
router.get('/vendas-totais-ano-atual', authenticateJWT, dashboardController.VendasTotaisPorAno);

//Novos adicionados

/**
 * @swagger
 * /dashboard/VendasPorCategoria:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Retorna as vendas por categoria do ano atual por mês
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista das vendas por categoria totais por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ano:
 *                     type: string
 *                     description: Ano da venda
 *                   label:
 *                     type: string
 *                     description: Rótulo no formato ano/mês
 *                   data:
 *                     type: number
 *                     format: float
 *                     description: Total das vendas no mês
 *       500:
 *         description: Erro ao buscar vendas por categoria
 */
router.get('/VendasPorCategoria', authenticateJWT, dashboardController.VendasPorCategoria);

/**
 * @swagger
 * /dashboard/Top10clientes:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Retorna os top10 clientes do ano atual por mês
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dos top10 clientes por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ano:
 *                     type: string
 *                     description: Ano da venda
 *                   label:
 *                     type: string
 *                     description: Rótulo no formato ano/mês
 *                   data:
 *                     type: number
 *                     format: float
 *                     description: Top 10 clientes no mês
 *       500:
 *         description: Erro ao buscar top10 clientes do mês
 */
router.get('/Top10clientes', authenticateJWT, dashboardController.Top10clientes);

/**
 * @swagger
 * /dashboard/ProdutoMaiorReceita:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Retorna os produtos com maior receita do ano atual por mês
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dos produtos com maior receita por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ano:
 *                     type: string
 *                     description: Ano da venda
 *                   label:
 *                     type: string
 *                     description: Rótulo no formato ano/mês
 *                   data:
 *                     type: number
 *                     format: float
 *                     description: Produtos com maior receita no mês
 *       500:
 *         description: Erro ao buscar produtos com maior receita do mês
 */
router.get('/ProdutoMaiorReceita', authenticateJWT, dashboardController.ProdutoMaiorReceita);

/**
 * @swagger
 * /dashboard/QuantiaProdutoVendido:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Retorna quantia de produto vendido por mês
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista da quantia de produto vendido por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ano:
 *                     type: string
 *                     description: Ano da venda
 *                   label:
 *                     type: string
 *                     description: Rótulo no formato ano/mês
 *                   data:
 *                     type: number
 *                     format: float
 *                     description: Produtos com maior quantia vendida no mês
 *       500:
 *         description: Erro ao buscar produtos com maior quantia vendida do mês
 */
router.get('/QuantiaProdutoVendido', authenticateJWT, dashboardController.QuantiaProdutoVendido);





module.exports = router;