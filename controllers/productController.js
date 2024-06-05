const { response, request } = require("express");
const Product = require("../models/product");


const createProduct = async (req = request, res = response) => {
    console.log(req.body);

    try {
        const { 
            name,
            description,
            price,
            images,
            categories
        } = req.body;
        
        const product = await Product.create({
            name,
            description,
            price
        });

        await product.save();
        
        res.status(200).json({
            success: true,
        });
    }   catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }

}  

module.exports = {
    createProduct,
};