const Subcategoria = require('../models/Subcategorias');

exports.obterTodasAsSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategoria.findAll();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).send('Erro ao buscar subcategorias');
  }
};

exports.criarSubcategoria = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.create(req.body);
    res.status(201).json(subcategoria);
  } catch (error) {
    res.status(500).send('Erro ao criar subcategoria');
  }
};

exports.obterSubcategoriaPorId = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findByPk(req.params.id);
    if (subcategoria) {
      res.json(subcategoria);
    } else {
      res.status(404).send('Subcategoria não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar subcategoria');
  }
};

exports.atualizarSubcategoria = async (req, res) => {
  try {
    const [atualizado] = await Subcategoria.update(req.body, {
      where: { id: req.params.id }
    });
    if (atualizado) {
      const subcategoriaAtualizada = await Subcategoria.findByPk(req.params.id);
      res.json(subcategoriaAtualizada);
    } else {
      res.status(404).send('Subcategoria não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar subcategoria');
  }
};

exports.deletarSubcategoria = async (req, res) => {
  try {
    const deletado = await Subcategoria.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Subcategoria não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar subcategoria');
  }
};