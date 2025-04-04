const express = require('express');
const router = express.Router();
const formController = require('../controller/form.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/contacts', formController.submitForm); 
router.get('/admin/contacts',authenticate, formController.getSubmissions);
router.delete('/admin/contacts/:id',authenticate, formController.deleteSubmission);

module.exports = router;