const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.obterTodosOsUsuarios = async (req, res) => {
  try {
    // Excluir o campo 'senha' dos resultados
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, telefone, senha, perfilId } = req.body;

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Criar o usuário com a senha criptografada
    const usuario = await Usuario.create({
      nome,
      email,
      telefone,
      senha: senhaCriptografada,
      perfilId
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).send('Erro ao criar usuário');
  }
};

exports.obterUsuarioPorId = async (req, res) => {
  try {
    // Excluir o campo 'senha' do resultado
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['senha'] }
    });

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar usuário');
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { senha, ...restoDoCorpo } = req.body;

    // Se a senha for fornecida, criptografá-la
    if (senha) {
      restoDoCorpo.senha = await bcrypt.hash(senha, 10);
    }

    const [atualizado] = await Usuario.update(restoDoCorpo, {
      where: { id: req.params.id }
    });

    if (atualizado) {
      const usuarioAtualizado = await Usuario.findByPk(req.params.id);
      res.json(usuarioAtualizado);
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar usuário');
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const deletado = await Usuario.destroy({
      where: { id: req.params.id }
    });
    if (deletado) {
      res.status(204).send();
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar usuário');
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, secretKey, { expiresIn: '3h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

exports.me = async (req, res) => {
  try {
    // O usuário já deve estar no req.user graças ao middleware authenticateJWT
    const usuario = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ['senha'] }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json([usuario]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações do usuário' });
  }
};

exports.logout = (req, res) => {
  // Invalide o token no lado do cliente
  res.json({ message: 'Logout realizado com sucesso' });
};