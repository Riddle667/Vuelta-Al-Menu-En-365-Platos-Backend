const { response, request } = require("express");
const Product = require("../models/product");
const Image = require("../models/Image");
const Category_Product = require("../models/category_product");

const createProduct = async (req = request, res = response) => {
    try {
        const { name, description, images, price, categoryIds } = req.body;

        const product = await Product.create({
            name,
            description,
            price
        });

        await Promise.all(images.map(async (image) => {
            await Image.create({ path: image, Productid: product.id });
        }));

        await Promise.all(categoryIds.map(async (categoryId) => {
            await Category_Product.create({ Categoryid: categoryId, Productid: product.id });
        }));

        res.status(201).json({
            success: true,
            message: 'Producto creado con exito',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createProduct,
};