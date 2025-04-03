const request = require('supertest');
const express = require('express');
const authController = require('../controller/auth.controller'); // Corrected path
const authService = require('../services/auth.service');

// Mock Express app
const app = express();
app.use(express.json());
app.post('/login', authController.login);

// Mock authService
jest.mock('../services/auth.service');

describe('Auth Controller - Login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test('✅ Should return token on valid admin key', async () => {
    authService.authenticateAdmin.mockResolvedValue('mocked-jwt-token');

    const response = await request(app)
      .post('/login')
      .send({ adminKey: 'valid-key' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('token', 'mocked-jwt-token');
    expect(authService.authenticateAdmin).toHaveBeenCalledWith('valid-key');
  });

  test('❌ Should return 400 if adminKey is missing', async () => {
    const response = await request(app).post('/login').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Admin key is required' });
    expect(authService.authenticateAdmin).not.toHaveBeenCalled();
  });

  test('❌ Should return 401 on invalid admin key', async () => {
    authService.authenticateAdmin.mockRejectedValue(new Error('Invalid admin key'));

    const response = await request(app)
      .post('/login')
      .send({ adminKey: 'wrong-key' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Invalid admin key');
  });
});
