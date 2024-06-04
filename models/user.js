const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");
const Address = require("./address");
const Order = require("./order");



class User extends Model {
    static id;
    static name;
    static lastName;
    static email;
    static phone;
    static image;
    static password;
}

User.init({
    name: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    modelName: 'User'
});

User.Role = User.belongsTo(require('./role'), {foreignKey: 'role_id'});
User.Address = User.hasMany(Address, {foreignKey: 'user_id', onDelete: 'CASCADE'});
User.Order = User.hasMany(Order, {foreignKey: 'user_id'});

User.prototype.toJSON = function() {
    const user = this.get();
    delete user.password; // Delete this property password
    // Include the role_id
    user.role_id = this.getDataValue('role_id');

    return user;
};

module.exports = User;