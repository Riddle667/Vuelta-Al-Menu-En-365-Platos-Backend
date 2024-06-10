const { request, response } = require("express");

const validateArchiveUpload = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No files uploaded.'
        });
    }
    next();
}

module.exports = {
    validateArchiveUpload
};
