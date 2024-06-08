const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Category_Product extends Model {}

Category_Product.init({
    Categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    Productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    }
}, {
    sequelize: db,
    modelName: 'Category_Product',
    timestamps: false
});

module.exports = Category_Product;
