const { DataTypes } = require("sequelize");

modelDefine = (sequelize) => {
    sequelize.define("genre", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
}

module.exports = modelDefine;