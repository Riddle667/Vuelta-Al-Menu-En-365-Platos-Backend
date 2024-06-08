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

// Listar Productos
const getProducts = async (req = request, res = response) => {
    try {
        const products = await Product.findAll({
            include: [{
                model: Image,
                attributes: ['path']
            }]
        });

        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Obtener Producto por ID
const getProductById = async (req = request, res = response) => {
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

// Actualizar Producto
const updateProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, description, images, price, categoryIds } = req.body;

        // Buscar producto
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Actualizar datos del producto
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;

        await product.save();

        // Actualizar imágenes
        if (images) {
            await Image.destroy({ where: { Productid: product.id } });
            await Promise.all(images.map(async (image) => {
                await Image.create({ path: image, Productid: product.id });
            }));
        }

        // Actualizar categorías
        if (categoryIds) {
            await Category_Product.destroy({ where: { Productid: product.id } });
            await Promise.all(categoryIds.map(async (categoryId) => {
                await Category_Product.create({ Categoryid: categoryId, Productid: product.id });
            }));
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
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

// Eliminar Producto
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
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};