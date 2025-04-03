const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const {validateSchema} = require('../middleware/validate.middleware')

const middleware = validateSchema(userValidationSchema)

router.post('/login',middleware, authController.login);

module.exports = router;