const Sequelize = require('sequelize');
const sequelize = new Sequelize('Mantra', 'root', '1Udm0bMAhA', {
    host: 'mysqldb',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const connect = () => {
    return sequelize.authenticate();
};

module.exports = sequelize;
module.exports.connect = connect;