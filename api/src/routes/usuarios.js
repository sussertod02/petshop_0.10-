const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioControllers');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Realiza o login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticação
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', usuarioController.login);

/**
 * @swagger
 * /usuarios/logout:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Realiza o logout do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.post('/logout', authenticateJWT, usuarioController.logout);

/**
 * @swagger
 * /usuarios/me:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna os dados do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/me', authenticateJWT, usuarioController.me);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', authenticateJWT, usuarioController.obterTodosOsUsuarios);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/', usuarioController.criarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', authenticateJWT, usuarioController.obterUsuarioPorId);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', authenticateJWT, usuarioController.atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Deleta um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', authenticateJWT, usuarioController.deletarUsuario);

module.exports = router;