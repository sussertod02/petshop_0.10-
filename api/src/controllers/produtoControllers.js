const Produto = require('../models/Produtos');

exports.obterTodosOsProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).send('Erro ao buscar produtos');
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).send('Erro ao criar produto');
  }
};

exports.obterProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar produto');
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const [atualizado] = await Produto.update(req.body, {
      where: { id: req.params.id }
    });
    if (atualizado) {
      const produtoAtualizado = await Produto.findByPk(req.params.id);
      res.json(produtoAtualizado);
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar produto');
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    const deletado = await Produto.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar produto');
  }
};