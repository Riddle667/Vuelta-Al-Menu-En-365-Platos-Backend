const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");


class Image extends Model {
    static id;
    static path;
}

Image.init({
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Image'
});

module.exports = Image;


