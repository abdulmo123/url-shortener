const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const Url = sequelize.define('Url', {
    key: DataTypes.STRING,
    full_urL: DataTypes.STRING,
    short_url: DataTypes.STRING,
    createdAt: DataTypes.DATE,
});