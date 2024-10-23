const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Perfil:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do perfil
 *         nome:
 *           type: string
 *           description: Nome do perfil
 *       example:
 *         id: "abc123"
 *         nome: "Administrador"
 */

/**
 * @swagger
 * /perfis:
 *   get:
 *     tags:
 *       - Perfis
 *     summary: Retorna todos os perfis
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de perfis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Perfil'
 */
router.get('/', authenticateJWT, perfilController.obterTodasOsPerfis);

/**
 * @swagger
 * /perfis:
 *   post:
 *     tags:
 *       - Perfis
 *     summary: Cria um novo perfil
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Perfil'
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       500:
 *         description: Erro ao criar perfil
 */
router.post('/', authenticateJWT, perfilController.criarPerfil);

/**
 * @swagger
 * /perfis/{id}:
 *   get:
 *     tags:
 *       - Perfis
 *     summary: Retorna um perfil pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do perfil
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       404:
 *         description: Perfil não encontrado
 */
router.get('/:id', authenticateJWT, perfilController.obterPerfilPorId);

/**
 * @swagger
 * /perfis/{id}:
 *   put:
 *     tags:
 *       - Perfis
 *     summary: Atualiza um perfil pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do perfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Perfil'
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       404:
 *         description: Perfil não encontrado
 */
router.put('/:id', authenticateJWT, perfilController.atualizarPerfil);

/**
 * @swagger
 * /perfis/{id}:
 *   delete:
 *     tags:
 *       - Perfis
 *     summary: Deleta um perfil pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do perfil
 *     responses:
 *       204:
 *         description: Perfil deletado com sucesso
 *       404:
 *         description: Perfil não encontrado
 */
router.delete('/:id', authenticateJWT, perfilController.deletarPerfil);

module.exports = router;