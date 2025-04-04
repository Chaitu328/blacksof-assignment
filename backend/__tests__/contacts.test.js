const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

// Mocks
jest.mock('../services/form.service');
jest.mock('../validation/form.validation');

const formService = require('../services/form.service');
const { validateFormSubmission } = require('../validation/form.validation');
const formRouter = require('../routes/form.routes');

const app = express();
app.use(express.json());
app.use('/api', formRouter);

const mockToken = jwt.sign({ admin: true }, 'test-secret');

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret';
});

describe('POST /api/contacts', () => {
  it('should return 400 for validation error', async () => {
    validateFormSubmission.mockReturnValue({ error: { details: [{ message: 'Invalid input' }] } });

    const res = await request(app).post('/api/contacts').send({ name: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid input');
  });

  it('should return 201 and save form data', async () => {
    validateFormSubmission.mockReturnValue({ error: null });
    const fakeSubmission = { id: 1, name: 'Test User', email: 'test@example.com' };
    formService.createFormSubmission.mockResolvedValue(fakeSubmission);

    const res = await request(app)
      .post('/api/contacts')
      .send(fakeSubmission);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(fakeSubmission);
  });
});

describe('GET /api/admin/contacts', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).get('/api/admin/contacts');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Access denied. No token provided');
  });

  it('should return 200 with submissions if authenticated', async () => {
    const fakeSubmissions = [{ id: 1, name: 'Test' }];
    formService.getAllSubmissions.mockResolvedValue(fakeSubmissions);

    const res = await request(app)
      .get('/api/admin/contacts')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeSubmissions);
  });
});

describe('DELETE /api/admin/contacts/:id', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).delete('/api/admin/contacts/123');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Access denied. No token provided');
  });

  it('should return 404 if submission not found', async () => {
    formService.deleteSubmission.mockResolvedValue(null);

    const res = await request(app)
      .delete('/api/admin/contacts/999')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Submission not found');
  });

  it('should return success if deletion is successful', async () => {
    formService.deleteSubmission.mockResolvedValue(true);

    const res = await request(app)
      .delete('/api/admin/contacts/1')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Submission deleted successfully');
  });
});
