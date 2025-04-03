const express = require('express');
const router = express.Router();
const formController = require('../controller/form.controller');

router.post('/', formController.submitForm); 
router.get('/', formController.getSubmissions);
router.delete('/:id', formController.deleteSubmission);

module.exports = router;