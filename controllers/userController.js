const { request, response } = require("express")
const User = require("../models/user")
const emailHelper = require('../helpers/send-email');
const bcryptjs = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            data: users,
        })
    } catch (error) {
        res.status(500).json({
            message: 'false'
        })
    }
}

const changePassword = async (req = request, res = response) => {
    const { userId, newPassword } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User is not valid'
            });
        }

        // Hash the new password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(newPassword, salt);
        
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

module.exports = {
    getUsers,
    changePassword
}


module.exports = {
    getUsers,
    changePassword
}