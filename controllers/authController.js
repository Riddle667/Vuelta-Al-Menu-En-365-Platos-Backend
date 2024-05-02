const {request, response} = require('express');

const User = require('../models/user');

const emailHelper = require('../helpers/emailHelper');

const GetUsers = async (req = request, res = response) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            users
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

const changePassword = async (req = request, res = response) => {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({
            success: false,
            msg: 'User not found'
        })
    }

    console.log(user);

    const verificationCode = 123456;

    await emailHelper.sendEmail(
        user.email,
        'Código de verificación por correo electrónico: $(verificationCode)',
        'Estimado ${user.name} $(user.lastName), su código de verificación es: $(verificationCode)' 

    );
    res.status(200).send('Email send');
}

module.exports = { 
    GetUsers,
    changePassword,
}