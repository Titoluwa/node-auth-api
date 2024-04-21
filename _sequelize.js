// sequelize.js
const Sequelize = require('sequelize');
const config = require('./_config');

const sequelize = new Sequelize(config.development);

module.exports = sequelize;
