const {
    INTEGER
} = require('sequelize');
const {
    Sequelize
} = require('sequelize');

const sequelize = require('../util/db');

const Order = sequelize.define('order', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
})

module.exports = Order;