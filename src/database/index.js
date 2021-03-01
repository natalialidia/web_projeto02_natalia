const Sequelize = require('sequelize');

const config = require('../config/database');

const Customer = require('../models/Customer');
const Service = require('../models/Service');
const Schedule = require('../models/Schedule');

const connection = new Sequelize(config);

// Passando conexão para os models
Customer.init(connection);
Service.init(connection);
Schedule.init(connection);

// Passando os models registrados para fazer associações
Customer.associate(connection.models);
Service.associate(connection.models);
Schedule.associate(connection.models);

module.exports = connection;