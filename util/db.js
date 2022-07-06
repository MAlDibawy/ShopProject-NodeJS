const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop_db', 'root', 'Mdibawy1997_+', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;