const { ValidationError, UniqueConstraintError } = require('sequelize');
const Usuario = require('../models/Usuarios');

describe('Validação de Usuario', () => {
  test('Deve falhar se o e-mail for inválido', async () => {
    expect.assertions(1);

    try {
      const usuario = Usuario.build({
        nome: 'Maria Souza',
        email: 'email-invalido',  // E-mail inválido
        telefone: '987654321',
        senha: 'senha123'
      });
      await usuario.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve falhar se o nome for nulo', async () => {
    expect.assertions(1);

    try {
      const usuario = Usuario.build({
        email: 'maria.souza@example.com',
        telefone: '987654321',
        senha: 'senha123'
      });
      await usuario.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve falhar se a senha for muito curta', async () => {
    expect.assertions(1);

    try {
      const usuario = Usuario.build({
        nome: 'Carlos Silva',
        email: 'carlos.silva@example.com',
        telefone: '123456789',
        senha: '123'  // Senha muito curta
      });
      await usuario.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve passar se o telefone for nulo', async () => {
    const usuario = Usuario.build({
      nome: 'Ana Lima',
      email: 'ana.lima@example.com', // E-mail válido
      senha: 'senhaSegura123',
      telefone: null
    });

    await expect(usuario.validate()).resolves.not.toThrow();
  });

  test('Deve falhar se o e-mail já estiver em uso', async () => {
    expect.assertions(1);

    // Supondo que já exista um usuário com este e-mail no banco de dados
    await Usuario.create({
      nome: 'João Almeida',
      email: 'joao.almeida@example.com',
      senha: 'senhaSegura123'
    });

    try {
      const usuario = Usuario.build({
        nome: 'Pedro Santos',
        email: 'joao.almeida@example.com',  // E-mail duplicado
        senha: 'senhaSegura456'
      });
      await usuario.save();
    } catch (error) {
      expect(error).toBeInstanceOf(UniqueConstraintError);
    }
  });
});