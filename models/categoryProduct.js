const { Model } = require("sequelize");
const db = require("../db/connection");



class CategoryProduct extends Model {
    static category_id;
    static product_id;
}

CategoryProduct.init({}, {
    sequelize: db,
    modelName: 'Category_Product'
});


module.exports = CategoryProduct;