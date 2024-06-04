const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");
const Image = require("./Image");
const OrderProduct = require("./orderProduct");
const Order = require("./order");

class Product extends Model{
    static id;
    static price;
    static name;
    static description;
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
    }
}, {
    sequelize: db,
    modelName: 'Product'
});

Product.Image = Product.hasMany(Image, {foreignKey: 'product_id', onDelete: 'CASCADE'});

module.exports = Product;