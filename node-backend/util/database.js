const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', '', {
    dialect:'mysql',
    localhost: 'locahost'
});


module.exports = sequelize;
