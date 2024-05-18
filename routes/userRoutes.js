const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, changePassword } = require("../controllers/userController");

const { validateJWT } = require("../middleware/validate-jwt");
const { validateFields } = require("../middleware/validate-fields");
const router = Router();

router.get('/', [
    validateJWT
], getUsers);

router.put('/change-password', [
    check('token', 'The token is required').not().isEmpty(),
    check('newPassword', 'The new password is required').not().isEmpty(),
    validateFields
], changePassword);

module.exports = router;