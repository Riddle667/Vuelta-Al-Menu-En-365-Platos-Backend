const { request, response } = require("express");
const Category = require("../models/category");

const createCategory = async (req = request, res = response) => {
    console.log(req.body);

    try {
        const { 
            name: nameReq,
            description: descriptionReq,
            image: imageReq
        } = req.body;

        const categoryExist = await Category.findOne({ where: { name: nameReq } });

        if (categoryExist) {
            return res.status(400).json({
                success: false,
                message: 'This category already exists'
            });
        }
    
        const category = await Category.create({
            name: nameReq,
            description: descriptionReq,
            image: imageReq
        });
    
        await category.save();
    
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }

}

const showCategory = async (req = request, res = response) => {

    try {
        const categories = await Category.findAll();
        console.log(categories);
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }

    
}

const updateCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const file = req.files?.image;

        // Validaciones
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required"
            });
        }

        // Buscar la categoría existente
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Actualizar campos
        category.name = name;
        category.description = description;

        // Actualizar imagen si se proporciona una nueva
        if (file) {
            const { secure_url } = await updateImageCloudinary(file.tempFilePath, `AppDelivery365/categories`);
            category.image = secure_url;
        }

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        console.error('Error in updateCategory:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const deleteCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        // Buscar la categoría existente
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await category.destroy();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error('Error in deleteCategory:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createCategory,
    showCategory,
    updateCategory,
    deleteCategory
};