const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControllers');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *         email:
 *           type: string
 *           description: Email do cliente
 *         telefone:
 *           type: string
 *           description: Telefone do cliente
 *       example:
 *         id: 1
 *         nome: "João Silva"
 *         email: "joao.silva@example.com"
 *         telefone: "123456789"
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Retorna todos os clientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', authenticateJWT, clienteController.obterTodosOsClientes);

/**
 * @swagger
 * /clientes:
 *   post:
 *     tags:
 *       - Clientes
 *     summary: Cria um novo cliente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro na validação dos dados
 *       500:
 *         description: Erro ao criar cliente
 */
router.post('/', authenticateJWT, clienteController.criarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Retorna um cliente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', authenticateJWT, clienteController.obterClientePorId);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     tags:
 *       - Clientes
 *     summary: Atualiza um cliente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Erro na validação dos dados
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/:id', authenticateJWT, clienteController.atualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     tags:
 *       - Clientes
 *     summary: Deleta um cliente pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       204:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:id', authenticateJWT, clienteController.deletarCliente);

module.exports = router;