const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - nome
 *         - idade
 *         - especie
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do pet
 *         nome:
 *           type: string
 *           description: Nome do pet
 *         idade:
 *           type: integer
 *           description: Idade do pet
 *         especie:
 *           type: string
 *           description: Espécie do pet
 *         clienteId:
 *           type: integer
 *           description: ID do cliente associado ao pet
 *       example:
 *         id: 1
 *         nome: "Rex"
 *         idade: 5
 *         especie: "Cachorro"
 *         clienteId: 2
 */

/**
 * @swagger
 * /pets:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Retorna todos os pets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/', authenticateJWT, petController.obterTodosOsPets);

/**
 * @swagger
 * /pets:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Cria um novo pet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Erro ao criar pet
 */
router.post('/', authenticateJWT, petController.criarPet);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Retorna um pet pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Pet encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet não encontrado
 */
router.get('/:id', authenticateJWT, petController.obterPetPorId);

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     tags:
 *       - Pets
 *     summary: Atualiza um pet pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet não encontrado
 */
router.put('/:id', authenticateJWT, petController.atualizarPet);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     tags:
 *       - Pets
 *     summary: Deleta um pet pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pet
 *     responses:
 *       204:
 *         description: Pet deletado com sucesso
 *       404:
 *         description: Pet não encontrado
 */
router.delete('/:id', authenticateJWT, petController.deletarPet);

module.exports = router;