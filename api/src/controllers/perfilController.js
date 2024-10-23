const Perfil = require('../models/Perfis');

exports.obterTodasOsPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.findAll();
    res.json(perfis);
  } catch (error) {
    res.status(500).send('Erro ao buscar perfil');
  }
};

exports.criarPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.create(req.body);
    res.status(201).json(perfil);
  } catch (error) {
    res.status(500).send('Erro ao criar perfil');
  }
};

exports.obterPerfilPorId = async (req, res) => {
  try {
    const perfil = await Perfil.findByPk(req.params.id);
    if (perfil) {
      res.json(perfil);
    } else {
      res.status(404).send('Perfil não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar perfil');
  }
};

exports.atualizarPerfil = async (req, res) => {
  try {
    const [atualizado] = await Perfil.update(req.body, {
      where: { id: req.params.id }
    });
    if (atualizado) {
      const perfilAtualizada = await Perfil.findByPk(req.params.id);
      res.json(perfilAtualizada);
    } else {
      res.status(404).send('Perfil não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar perfil');
  }
};

exports.deletarPerfil = async (req, res) => {
  try {
    const deletado = await Perfil.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Perfil não encontrada');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar perfil');
  }
};