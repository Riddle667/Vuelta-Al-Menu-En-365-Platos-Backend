const { request, response } = require("express");
const Category = require("../models/category");

const createCategory = async (req = request, res = response) => {
    console.log(req.body);


    const { 
        name: nameReq,
        description: descriptionReq,
        image: imageReq
    } = req.body;

    const category = await Category.create({
        name: nameReq,
        description: descriptionReq,
        image: imageReq
    });

    await category.save();
    


    

    // const category = await Category.create({
    //     name
    // });

    res.status(200).json({
        success: true,
    });
}


module.exports = {
    createCategory
};

