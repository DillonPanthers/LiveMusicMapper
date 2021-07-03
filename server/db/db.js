const Sequelize = require('sequelize');
const config = {
    logging: false,
};
const db = new Sequelize(
    process.env.DATABASE_URL || 'postgres://localhost/dillon_panthers',
    config
);

module.exports = { db };
