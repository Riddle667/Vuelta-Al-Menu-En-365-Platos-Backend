const { response, request } = require("express");
const Product = require("../models/product");
const Image = require("../models/Image");
const { updateImageCloudinary } = require("./uploadController");

const getAllProducts = async (req = request, res = response) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Image,
                attributes: ['path']
            }]
        });
        console.log(products);

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const createProduct = async (req = request, res = response) => {
    try {
        const { name, description, price } = req.body;
        const files = req.files;

        if (!name || !description || !price || !files || Object.keys(files).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (isNaN(price)) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a number'
            });
        }

        // Check if product name already exists
        const existingProduct = await Product.findOne({ where: { name } });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product name must be unique'
            });
        }

        const product = await Product.create({ name, description, price });

        // Check if multiple files are provided
        if (Array.isArray(files.images)) {
            for (let i = 0; i < files.images.length; i++) {
                const file = files.images[i];
                const { secure_url } = await updateImageCloudinary(file.tempFilePath, `AppDelivery365/products`);
                await Image.create({ path: secure_url, product_id: product.id });
            }
        } else {
            // Single file case
            const { secure_url } = await updateImageCloudinary(files.images.tempFilePath, `AppDelivery365/products`);
            await Image.create({ path: secure_url, product_id: product.id });
        }

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Error in createProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const updateProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const files = req.files;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price && !isNaN(price)) product.price = price;

        if (files && Object.keys(files).length > 0) {
            await Image.destroy({ where: { Productid: product.id } });

            for (let key in files) {
                const file = files[key];
                const { secure_url } = await updateImageCloudinary(file.tempFilePath, `AppDelivery365/products`);
                await Image.create({ path: secure_url, Productid: product.id });
            }
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Error in updateProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const deleteProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.destroy();

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getProductDetail = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [{
                model: Image,
                attributes: ['path']
            }]
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error in getProductDetail:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetail
};
