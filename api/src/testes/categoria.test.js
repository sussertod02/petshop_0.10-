const { ValidationError } = require('sequelize');
const Categoria = require('../models/Categorias');

describe('Validação de Categoria', () => {
  test('Deve falhar se o nome for nulo', async () => {
    expect.assertions(1);

    try {
      const categoria = Categoria.build({
        id: '123',
        nome: null // Nome nulo
      });
      await categoria.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve falhar se o nome for vazio', async () => {
    expect.assertions(1);

    try {
      const categoria = Categoria.build({
        id: '123',
        nome: '' // Nome vazio
      });
      await categoria.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve falhar se o nome for menor que 3 caracteres', async () => {
    expect.assertions(1);

    try {
      const categoria = Categoria.build({
        id: '123',
        nome: 'ab' // Nome com menos de 3 caracteres
      });
      await categoria.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve falhar se o nome for maior que 255 caracteres', async () => {
    expect.assertions(1);

    try {
      const categoria = Categoria.build({
        id: '123',
        nome: 'a'.repeat(256) // Nome com mais de 255 caracteres
      });
      await categoria.validate();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });

  test('Deve passar se o nome tiver entre 3 e 255 caracteres', async () => {
    const categoria = Categoria.build({
      id: '123',
      nome: 'Categoria Válida' // Nome válido
    });

    await expect(categoria.validate()).resolves.not.toThrow();
  });
});