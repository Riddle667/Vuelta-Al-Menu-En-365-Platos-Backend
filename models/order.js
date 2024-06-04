const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");
const User = require("./user");
const OrderProduct = require("./orderProduct");
const Product = require("./product");

class Order extends Model {
    static id;
    static total_price;
    static status;
    static date;
    static cant
}

Order.init({
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.ENUM,
        values: ['created', 'pend', 'shipped', 'delivered', 'cancelled'],
        defaultValue: 'created'
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    cant: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db,
    modelName: 'Order'
});

Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'order_id',
    otherKey: 'product_id'
});

module.exports = Order;