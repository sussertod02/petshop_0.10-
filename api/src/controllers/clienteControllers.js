const Cliente = require('../models/Clientes');

exports.obterTodosOsClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Erro ao buscar clientes');
  }
};

exports.criarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Extrai a mensagem de erro específica
      const mensagemErro = error.errors.map(err => err.message).join(', ');
      res.status(400).send(mensagemErro);
    } else {
      res.status(500).send('Erro ao criar cliente');
    }
  }
};

exports.obterClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar cliente');
  }
};

exports.atualizarCliente = async (req, res) => {
  try {
    const [atualizado] = await Cliente.update(req.body, {
      where: { id: req.params.id }
    });
    if (atualizado) {
      const clienteAtualizado = await Cliente.findByPk(req.params.id);
      res.json(clienteAtualizado);
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar cliente');
  }
};

exports.deletarCliente = async (req, res) => {
  try {
    const deletado = await Cliente.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar cliente');
  }
};