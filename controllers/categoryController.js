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


module.exports = {
    createCategory,
    showCategory
};

