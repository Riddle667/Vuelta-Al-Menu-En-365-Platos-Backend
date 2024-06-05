const { response, request } = require("express");
const Product = require("../models/product");


const createProduct = async (req = request, res = response) => {
    console.log(req.body);

    try {
        const { 
            name: nameReq,
            description: descriptionReq,
            image: imageReq,
            price: priceReq,
            categoryId: categoryId
        } = req.body;
        
        const product = await Product.create({
            name: nameReq,
            description: descriptionReq,
            price: priceReq,
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