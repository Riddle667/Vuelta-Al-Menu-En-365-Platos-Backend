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
        defaultValue: 0.0 // Asegúrate de usar un valor numérico apropiado
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: db,
    modelName: 'Product'
});

module.exports = Product;