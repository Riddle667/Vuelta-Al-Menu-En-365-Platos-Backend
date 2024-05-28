const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");
const User = require("./user");

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
        type: DataTypes.STRING,
        defaultValue: 'Pendiente'
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

module.exports = Order;