const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");



class Category extends Model{
    static id;
    static state;
    static name;
    static description;
    static image;
}

Category.init({
    state: {
        type: DataTypes.BOOLEAN,
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
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    modelName: 'Category'
});
module.exports = Category;