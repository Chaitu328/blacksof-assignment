const request = require('supertest');
const express = require('express');
const formService = require('../services/form.service');

// Mock Express app
const app = express();
app.use(express.json());
app.use('/contact', require('../routes/form.routes')); 

// Mock formService
jest.mock('../services/form.service');

describe('Contact Form API', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  // ✅ Test form submission (POST /)
  test('✅ Should submit a form successfully', async () => {
    const formData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    };

    const mockResponse = { id: '12345', ...formData };

    formService.createFormSubmission.mockResolvedValue(mockResponse);

    const response = await request(app).post('/contact').send(formData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(mockResponse);
    expect(formService.createFormSubmission).toHaveBeenCalledWith(formData);
  });

  // ❌ Test missing field validation
  test('❌ Should return 400 when required field is missing', async () => {
    const response = await request(app).post('/contact').send({
      email: 'john@example.com',
      subject: 'Test Subject'
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(formService.createFormSubmission).not.toHaveBeenCalled();
  });

  // ✅ Test getting all submissions (GET /)
  test('✅ Should fetch all submissions', async () => {
    const mockSubmissions = [
      { id: '123', fullName: 'Alice', email: 'alice@example.com', message: 'Hello' },
      { id: '456', fullName: 'Bob', email: 'bob@example.com', message: 'Hi' }
    ];

    formService.getAllSubmissions.mockResolvedValue(mockSubmissions);

    const response = await request(app).get('/contact');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockSubmissions);
    expect(formService.getAllSubmissions).toHaveBeenCalled();
  });

  // ✅ Test deleting a submission (DELETE /:id)
  test('✅ Should delete a submission', async () => {
    formService.deleteSubmission.mockResolvedValue(true);

    const response = await request(app).delete('/contact/123');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Submission deleted successfully');
    expect(formService.deleteSubmission).toHaveBeenCalledWith('123');
  });

  // ❌ Test deleting a non-existent submission
  test('❌ Should return 404 if submission not found', async () => {
    formService.deleteSubmission.mockResolvedValue(null);

    const response = await request(app).delete('/contact/999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Submission not found');
  });
});
