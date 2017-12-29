const Sequelize = require('sequelize');
const sequelize = require("../index");

const User = sequelize.define('user', {
    ID: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    Email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    Password: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
            len: [8,255]
        }
    },
    Salt: {
        allowNull: false,
        type: Sequelize.TEXT
    },
    Username: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
            len: [5,255]
        }
    },
    Role: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.TINYINT
    },
    IsApproved: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.TINYINT
    },
    ApprovalToken: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

const publicAttributes = ['ID', 'Email', 'Username', 'Role'];

module.exports = User;
module.exports.publicAttrs = publicAttributes;