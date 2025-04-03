const Form = require('../models/form.model');

module.exports = {
  createFormSubmission: async (formData) => {
    try {
      const submission = new Form(formData);
      return await submission.save();
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },

  getAllSubmissions: async () => {
    try {
      return await Form.find().sort('-createdAt');
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },

  deleteSubmission: async (id) => {
    try {
      return await Form.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
};