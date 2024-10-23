const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendasController'); 
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Venda:
 *       type: object
 *       required:
 *         - clienteId
 *         - dataVenda
 *         - valorTotal
 *         - status
 *       properties:
 *         clienteId:
 *           type: integer
 *           description: ID do cliente associado à venda
 *         dataVenda:
 *           type: string
 *           format: date-time
 *           description: Data da venda
 *         valorTotal:
 *           type: number
 *           format: decimal
 *           description: Valor total da venda
 *         status:
 *           type: string
 *           enum: [pendente, pago, cancelado]
 *           description: Status da venda
 *       example:
 *         clienteId: 1
 *         dataVenda: "2024-10-21T00:14:28Z"
 *         valorTotal: 150.00
 *         status: "pago"
 */

/**
 * @swagger
 * /vendas/clientes-mais-compras:
 *   get:
 *     tags:
 *       - Vendas
 *     summary: Retorna os clientes que mais compraram
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dos clientes que mais compraram
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do cliente
 *                   nome:
 *                     type: string
 *                     description: Nome do cliente
 *                   email:
 *                     type: string
 *                     description: Email do cliente
 *                   totalCompras:
 *                     type: integer
 *                     description: Número total de compras do cliente
 *                   valorTotalCompras:
 *                     type: number
 *                     format: float
 *                     description: Valor total das compras do cliente
 *       500:
 *         description: Erro ao buscar clientes que mais compraram
 */
router.get('/clientes-mais-compras', authenticateJWT, vendaController.clientesMaisCompras);

module.exports = router;