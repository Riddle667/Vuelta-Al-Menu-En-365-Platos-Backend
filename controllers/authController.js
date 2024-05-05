const { response,request } = require('express');
const User = require('../models/User');
const Role = require('../models/role');
const bcryptjs = require('bcryptjs');

const login = async (req = request, res = response) => {
};


const register = async (req = request, res = response) => {
    try{
        const {
            name,
            lastname,
            email,
            password,
            phone
        } = req.body;

        //get role client
        const role = await Role.findOne({where: {name: 'client'}});

        console.log(role.id);

        //create base user data
        const userData = {
            name,
            lastname,
            email,
            password,
            phone,
            role_id: role.id
        };

        console.log(userData);

        const user = new User(userData);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);

        await user.save();

        res.status(200).json({
            success: true,
            data: user,
            message: 'Usuario creado correctamente'
        });

    }catch(error){
        
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });

    }
    
};

module.exports = {
    login,
    register
}