const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Product extends Model{
    static id;
    static price;
    static name;
    static description;
    static image;
}

Product.init({
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Aquí definimos que image es una lista de Strings
    },
}, {
    sequelize: db,
    modelName: 'Product'
});
module.exports = Product;