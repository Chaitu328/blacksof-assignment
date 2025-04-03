const Joi = require('joi');

const formSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(100).required(),
  message: Joi.string().min(10).max(1000).required()
});

module.exports = {
  validateFormSubmission: (data) => formSchema.validate(data)
};