const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaControllers');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategoria:
 *       type: object
 *       required:
 *         - nome
 *         - categoriaId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da subcategoria
 *         nome:
 *           type: string
 *           description: Nome da subcategoria
 *         categoriaId:
 *           type: string
 *           description: ID da categoria associada à subcategoria
 *       example:
 *         id: 1
 *         nome: "Eletrônicos"
 *         categoriaId: "cat123"
 */

/**
 * @swagger
 * /subcategorias:
 *   get:
 *     tags:
 *       - Subcategorias
 *     summary: Retorna todas as subcategorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de subcategorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subcategoria'
 */
router.get('/', authenticateJWT, subcategoriaController.obterTodasAsSubcategorias);

/**
 * @swagger
 * /subcategorias:
 *   post:
 *     tags:
 *       - Subcategorias
 *     summary: Cria uma nova subcategoria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategoria'
 *     responses:
 *       201:
 *         description: Subcategoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategoria'
 *       500:
 *         description: Erro ao criar subcategoria
 */
router.post('/', authenticateJWT, subcategoriaController.criarSubcategoria);

/**
 * @swagger
 * /subcategorias/{id}:
 *   get:
 *     tags:
 *       - Subcategorias
 *     summary: Retorna uma subcategoria pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da subcategoria
 *     responses:
 *       200:
 *         description: Subcategoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategoria'
 *       404:
 *         description: Subcategoria não encontrada
 */
router.get('/:id', authenticateJWT, subcategoriaController.obterSubcategoriaPorId);

/**
 * @swagger
 * /subcategorias/{id}:
 *   put:
 *     tags:
 *       - Subcategorias
 *     summary: Atualiza uma subcategoria pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da subcategoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategoria'
 *     responses:
 *       200:
 *         description: Subcategoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategoria'
 *       404:
 *         description: Subcategoria não encontrada
 */
router.put('/:id', authenticateJWT, subcategoriaController.atualizarSubcategoria);

/**
 * @swagger
 * /subcategorias/{id}:
 *   delete:
 *     tags:
 *       - Subcategorias
 *     summary: Deleta uma subcategoria pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da subcategoria
 *     responses:
 *       204:
 *         description: Subcategoria deletada com sucesso
 *       404:
 *         description: Subcategoria não encontrada
 */
router.delete('/:id', authenticateJWT, subcategoriaController.deletarSubcategoria);

module.exports = router;