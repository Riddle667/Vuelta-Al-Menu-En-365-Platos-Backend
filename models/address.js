const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");



class Address extends Model{
    static id;
    static name;
    static street;
    static district;
    static reference_point;
}

Address.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reference_point: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Address'
});


module.exports = Address;