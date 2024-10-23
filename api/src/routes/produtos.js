const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoControllers');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do produto
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         categoriaId:
 *           type: integer
 *           description: ID da categoria associada ao produto
 *         subcategoriaId:
 *           type: integer
 *           description: ID da subcategoria associada ao produto
 *       example:
 *         id: 1
 *         nome: "Camiseta"
 *         preco: 29.99
 *         categoriaId: 2
 *         subcategoriaId: 5
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     tags:
 *       - Produtos
 *     summary: Retorna todos os produtos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/', authenticateJWT, produtoController.obterTodosOsProdutos);

/**
 * @swagger
 * /produtos:
 *   post:
 *     tags:
 *       - Produtos
 *     summary: Cria um novo produto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       500:
 *         description: Erro ao criar produto
 */
router.post('/', authenticateJWT, produtoController.criarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     tags:
 *       - Produtos
 *     summary: Retorna um produto pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', authenticateJWT, produtoController.obterProdutoPorId);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     tags:
 *       - Produtos
 *     summary: Atualiza um produto pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', authenticateJWT, produtoController.atualizarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     tags:
 *       - Produtos
 *     summary: Deleta um produto pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', authenticateJWT, produtoController.deletarProduto);

module.exports = router;