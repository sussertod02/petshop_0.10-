const Categoria = require('../models/Categorias');

exports.obterTodasAsCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).send('Erro ao buscar categorias');
  }
};

exports.criarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).send('Erro ao criar categoria');
  }
};

exports.obterCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).send('Categoria não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar categoria');
  }
};

exports.atualizarCategoria = async (req, res) => {
  try {
    const [atualizado] = await Categoria.update(req.body, {
      where: { id: req.params.id }
    });
    if (atualizado) {
      const categoriaAtualizada = await Categoria.findByPk(req.params.id);
      res.json(categoriaAtualizada);
    } else {
      res.status(404).send('Categoria não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar categoria');
  }
};

exports.deletarCategoria = async (req, res) => {
  try {
    const deletado = await Categoria.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Categoria não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar categoria');
  }
};