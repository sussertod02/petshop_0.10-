const Pet = require('../models/Pets');

exports.obterTodosOsPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (error) {
    res.status(500).send('Erro ao buscar pets');
  }
};

exports.criarPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).send('Erro ao criar pet');
  }
};

exports.obterPetPorId = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).send('Pet não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar pet');
  }
};

exports.atualizarPet = async (req, res) => {
  try {
    const [atualizado] = await Pet.update(req.body, {
      where: { id: req.params.id }
    });
    if (atualizado) {
      const petAtualizado = await Pet.findByPk(req.params.id);
      res.json(petAtualizado);
    } else {
      res.status(404).send('Pet não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar pet');
  }
};

exports.deletarPet = async (req, res) => {
  try {
    const deletado = await Pet.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Pet não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar pet');
  }
};