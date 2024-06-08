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
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM,
        values: ['created', 'pending', 'on_the_way', 'delivered'],
        defaultValue: 'created'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    cant: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db,
    modelName: 'Order'
});

Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'order_id',
    otherKey: 'product_id',
    onDelete: 'CASCADE'
});

module.exports = Order;