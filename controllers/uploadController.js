const { response, request } = require("express");
const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary con variables de entorno
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Reusable function to upload image to Cloudinary
const updateImageCloudinary = async (filePath, folder) => {
    try {
        const { secure_url } = await cloudinary.uploader.upload(filePath, {
            folder: folder
        });
        return { secure_url };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Error uploading image');
    }
};

// Function to handle image updates for users and products
const updateImage = async (req = request, res = response) => {
    try {
        const { collection, id } = req.params;
        let model;

        switch (collection) {
            case 'users':
                model = await User.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'User not exist'
                    });
                }
                break;

            case 'products':
                model = await Product.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'Product not exist'
                    });
                }
                break;

            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });
        }

        // Clean previous image
        if (model.image) {
            const nameImageArray = model.image.split('/');
            const nameImage = nameImageArray[nameImageArray.length - 1];
            const [public_image_id] = nameImage.split('.');
            cloudinary.uploader.destroy(`AppDelivery365/${collection}/${public_image_id}`);
        }

        // Extract temporal image
        const { tempFilePath } = req.files.archive;

        // upload to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: `AppDelivery365/${collection}`
        });

        // Update image to user
        model.image = secure_url;
        await model.save();

        res.status(201).json({
            success: true,
            data: model.image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = {
    updateImageCloudinary,
    updateImage
};
