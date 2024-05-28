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
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING
    },
    district: {
        type: DataTypes.STRING
    },
    reference_point: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    modelName: 'Address'
});


module.exports = Address;