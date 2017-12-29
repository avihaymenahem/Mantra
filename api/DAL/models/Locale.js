const Sequelize = require('sequelize');
const sequelize = require("../index");

const Locale = sequelize.define('locale', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    ReadableName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    Code: {
        allowNull: false,
        type: Sequelize.STRING
    },
    Icon: {
        type: Sequelize.STRING
    }
});

module.exports = Locale;