const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Address = require("../models/address");
const e = require("express");


const showAddress = async (req = request, res = response) => {
    const user = req.user;

    try {
        const address = await user.getAddresses();

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'No addresses found'
            });
        }
        address.forEach(element => {
            delete element.dataValues.district;
            delete element.dataValues.reference_point;
            delete element.dataValues.user_id;
            delete element.dataValues.createdAt;
            delete element.dataValues.updatedAt;
            console.log(element);
        });
        console.log(address);

        res.json({
            success: true,
            message: 'Address',
            data: address
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting address',
            error: error.message
        });
    }
    
}

const createAddress = async (req, res) => {
    const user = req.user;

    try {
        const { name, street, district, referencePoint } = req.body;

        // Crear la dirección con los datos proporcionados
        const newAddress = await Address.create({
            name,
            street,
            district,
            reference_point: referencePoint
        });

        // Asociar la dirección creada con el usuario
        await user.addAddress(newAddress);

        res.status(201).json({
            success: true,
            message: 'Address created'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating address',
            error: error.message // Solo enviamos el mensaje de error para mayor seguridad
        });
    }
};



module.exports = {
    showAddress,
    createAddress
}