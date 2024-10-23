const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');
const authenticateJWT = require('../middleware/auth');


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - metadescription
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do post
 *         title:
 *           type: string
 *           description: Título do post
 *         metadescription:
 *           type: string
 *           description: Meta descrição do post
 *         body:
 *           type: string
 *           description: Conteúdo do post
 *         categoriaId:
 *           type: string
 *           description: ID da categoria associada ao post
 *       example:
 *         id: "abc123"
 *         title: "Introdução ao Swagger"
 *         metadescription: "Aprenda a documentar sua API com Swagger"
 *         body: "Conteúdo completo sobre como usar o Swagger para documentar APIs."
 *         categoriaId: "cat456"
 */


/**
 * @swagger
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Retorna todos os posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', authenticateJWT, postController.obterTodosOsPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Cria um novo post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erro ao criar post
 */
router.post('/', authenticateJWT, postController.criarPost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Retorna um post pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 */
router.get('/:id', authenticateJWT, postController.obterPostPorId);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Atualiza um post pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 */
router.put('/:id', authenticateJWT, postController.atualizarPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Deleta um post pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       204:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.delete('/:id', authenticateJWT, postController.deletarPost);

module.exports = router;