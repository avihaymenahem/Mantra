const Sequelize = require('sequelize');
const sequelize = require("../index");

const Translation = sequelize.define('translation', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    UserID: {
        type: Sequelize.INTEGER
    },
    PhraseID: {
        type: Sequelize.INTEGER
    },
    LangID: {
        type: Sequelize.INTEGER
    },
    Text: {
        type: Sequelize.TEXT
    },
    State: {
        type: Sequelize.TINYINT
    }
});

module.exports = Translation;