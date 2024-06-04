const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");
const Product = require("./product");
const Order = require("./order");



class OrderProduct extends Model {
    static order_id;
    static product_id;
    static quantity;
    static price;
}

OrderProduct.init({
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
    }
}, {
    sequelize: db,
    modelName: 'Order_Product'
});

module.exports = OrderProduct;
