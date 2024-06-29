const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { sendEmail } = require("../helpers/send-email");

const login = async (req = request, res = response) => {

    try {
        console.log(req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Invalidate credentials.',
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        const userData = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role_id: user.role_id,
            session_token: token
        }

        res.status(200).json({
            success: true,
            data: userData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}


const register = async (req = request, res = response) => {

    try {
        const { name: nameReq,
            lastname: lastNameReq,
            email: emailReq,
            password: passwordReq,
            phone: phoneReq } = req.body;

        // Get to client role
        const role = await Role.findOne({ where: { name: 'CLIENTE' } });

        // Create base user data
        const userData = {
            name: nameReq,
            lastName: lastNameReq,
            email: emailReq,
            password: passwordReq,
            phone: phoneReq,
            role_id: role.id
        }

        const user = new User(userData);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);
        await user.save();


        // Generate JWT
        const token = await generateJWT(user.id);

        // Destructuring especific data to user
        const { id, name, lastName, phone, email, role_id } = user;

        const dataUser = { id, name, lastName, phone, email, role_id, session_token: token };

        res.status(201).json({
            success: true,
            data: dataUser,
            message: 'User created'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: 'User not created'
        });
    }
}

const requestPasswordReset = async (req = request, res = response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'El correo electrónico no está registrado en el sistema.'
            });
        }

        const resetToken = generateJWT(user.id, '1h'); // Genera un token válido por 1 hora
        const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;

        // Enviar correo electrónico
        await sendEmail({
            to: email,
            subject: 'Restablecimiento de contraseña',
            text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetURL}`
        });

        res.status(200).json({
            success: true,
            message: 'Correo electrónico enviado con éxito para restablecer la contraseña.'
        });
    } catch (error) {
        console.error('Error in requestPasswordReset:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const resetPassword = async (req = request, res = response) => {
    try {
        const { token, newPassword } = req.body;

        const { uid } = await verifyJWT(token); // Verificar el token y obtener el UID del usuario

        const user = await User.findByPk(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado.'
            });
        }

        // Validar la nueva contraseña
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña debe tener al menos 6 caracteres.'
            });
        }

        // Hash de la nueva contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(newPassword, salt);

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Contraseña restablecida con éxito.'
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    login,
    register,
    requestPasswordReset,
    resetPassword
};