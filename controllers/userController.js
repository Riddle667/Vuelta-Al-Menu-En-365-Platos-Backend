const { request, response } = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken");
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
    const { token, newPassword } = req.body;

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY); // Verifica el token usando la clave secreta
        const userId = decoded.id; // Extrae el ID del usuario del token decodificado

        // Buscar el usuario por ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User is not valid'
            });
        }

        // Hashear la nueva contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(newPassword, salt);

        // Guardar el nuevo password en la base de datos
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
