const express = require('express');
const sequelize = require('./config/database');
const swaggerSetup = require('../swagger'); 
const cors = require('cors'); 


// Importando modelos
const models = {
  Categoria: require('./models/Categorias'),
  Subcategoria: require('./models/Subcategorias'),
  Cliente: require('./models/Clientes'),
  Pet: require('./models/Pets'),
  Post: require('./models/Posts'),
  Produto: require('./models/Produtos'),
  Usuario: require('./models/Usuarios'),
  Perfil: require('./models/Perfis'),
  Venda: require('./models/Vendas'),  
  VendaItem: require('./models/VendasItens')
};

// Estabelecendo associações
Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// Importando rotas
const petsRoutes = require('./routes/pets');
const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const clientesRoutes = require('./routes/clientes');
const postsRoutes = require('./routes/posts');
const produtosRoutes = require('./routes/produtos');
const usuarioRoutes = require('./routes/usuarios');
const perfilRoutes = require('./routes/perfis');

const vendasRoutes = require('./routes/vendas');

const vendas2Routes = require('./routes/vendas2');

const dashboardRoutes = require('./routes/dashboard');

// Sincroniza o banco de dados
sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados sincronizado.');
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Swagger
swaggerSetup(app);

// Configurando rotas
app.use('/api/pets', petsRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/subcategorias', subcategoriasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/perfis', perfilRoutes);

app.use('/api/vendas', vendasRoutes);
app.use('/api/vendas2', vendas2Routes);

app.use('/api/dashboard', dashboardRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});