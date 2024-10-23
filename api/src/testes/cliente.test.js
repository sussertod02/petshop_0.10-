const { ValidationError, UniqueConstraintError } = require('sequelize');
const Cliente = require('../models/Clientes');

describe('Validação de Cliente', () => {
  test('Deve falhar se o e-mail for inválido', async () => {
    expect.assertions(1);

    try {
      const cliente = Cliente.build({
        nome: 'João Silva',
        email: 'email-invalido',  // E-mail inválido
        telefone: '123456789'
      });
      await cliente.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve falhar se o nome for nulo', async () => {
    expect.assertions(1);

    try {
      const cliente = Cliente.build({
        email: 'joao.silva@example.com',
        telefone: '123456789'
      });
      await cliente.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve passar se o telefone for nulo', async () => {
    const cliente = Cliente.build({
      nome: 'Ana Lima',
      email: 'ana.lima@example.com', // E-mail válido
      telefone: null
    });

    await expect(cliente.validate()).resolves.not.toThrow();
  });
});