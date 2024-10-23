const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da categoria
 *         nome:
 *           type: string
 *           description: Nome da categoria
 *           example: "Tecnologia"
 *           minLength: 3
 *           maxLength: 255
 *       example:
 *         id: "1"
 *         nome: "Tecnologia"
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Retorna todas as categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get('/', authenticateJWT, categoriaController.obterTodasAsCategorias);

/**
 * @swagger
 * /categorias:
 *   post:
 *     tags:
 *       - Categorias
 *     summary: Cria uma nova categoria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Erro ao criar categoria
 */
router.post('/', authenticateJWT, categoriaController.criarCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Retorna uma categoria pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/:id', authenticateJWT, categoriaController.obterCategoriaPorId);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     tags:
 *       - Categorias
 *     summary: Atualiza uma categoria pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.put('/:id', authenticateJWT, categoriaController.atualizarCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     tags:
 *       - Categorias
 *     summary: Deleta uma categoria pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.delete('/:id', authenticateJWT, categoriaController.deletarCategoria);

module.exports = router;