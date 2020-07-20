const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const user = require('../models/user');

const connection = new Sequelize(dbConfig); //Database connection

user.init(connection);

module.exports = connection;
