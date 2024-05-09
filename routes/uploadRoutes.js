const { Router } = require("express");
const { validateFields } = require("../middleware/validate-fields");
const { validateArchiveUpload } = require("../middleware/validate-archive");
const { updateImageCloudinary } = require("../controllers/uploadController");
const router = Router();

router.put('/:collection/:id', [
    validateArchiveUpload,
    validateFields
], updateImageCloudinary);

module.exports = router;