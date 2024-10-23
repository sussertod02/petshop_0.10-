const Post = require('../models/Posts');

exports.obterTodosOsPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Erro ao buscar posts');
  }
};

exports.criarPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).send('Erro ao criar post');
  }
};

exports.obterPostPorId = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar post');
  }
};

exports.atualizarPost = async (req, res) => {
  try {
    const [atualizado] = await Post.update(req.body, {
      where: { id: req.params.id }
    });
    if (atualizado) {
      const postAtualizado = await Post.findByPk(req.params.id);
      res.json(postAtualizado);
    } else {
      res.status(404).send('Post não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar post');
  }
};

exports.deletarPost = async (req, res) => {
  try {
    const deletado = await Post.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Post não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar post');
  }
};