const formService = require('../services/form.service');
const { validateFormSubmission } = require('../validation/form.validation');

module.exports = {
  submitForm: async (req, res) => {
    try {
      // Validate input
      const { error } = validateFormSubmission(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      // Process submission
      const submission = await formService.createFormSubmission(req.body);
      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSubmissions: async (req, res) => {
    try {
      const submissions = await formService.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSubmission: async (req, res) => {
    try {
      const result = await formService.deleteSubmission(req.params.id);
      if (!result) return res.status(404).json({ error: 'Submission not found' });
      res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};