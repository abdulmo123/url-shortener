const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const Url = sequelize.define('Url', {
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    full_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    short_url: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// sync with db
sequelize.sync();

module.exports = Url;