const Sequelize = require('sequelize');
const sequelize = require("../index");

const Project = sequelize.define('project', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    Title: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
            len: [3,255]
        }
    },
    Description: {
        type: Sequelize.TEXT
    }
});

module.exports = Project;