const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'src/data/petshop.db',
  logging: console.log,
});

module.exports = sequelize;