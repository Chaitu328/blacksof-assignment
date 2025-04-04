// auth.test.js
const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter = require('../routes/auth.routes');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('POST /auth/login', () => {
  const testAdminKey = 'correct-admin-key';
  const hashedAdminKey = bcrypt.hashSync(testAdminKey, 10);
  const jwtSecret = 'test-secret';

  beforeAll(() => {
    process.env.ADMIN_KEY_HASH = hashedAdminKey;
    process.env.JWT_SECRET = jwtSecret;
  });

  it('should return 400 if admin key is not provided', async () => {
    const res = await request(app).post('/auth/login').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Admin key is required');
  });

  it('should return 401 for invalid admin key', async () => {
    const res = await request(app).post('/auth/login').send({ adminKey: 'wrong-key' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid admin key');
  });

  it('should return JWT token for valid admin key', async () => {
    const res = await request(app).post('/auth/login').send({ adminKey: testAdminKey });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.token).toBe('string');
    expect(res.body.expiresIn).toBe(3600);

    // Optional: Verify the token content
    const decoded = jwt.verify(res.body.token, jwtSecret);
    expect(decoded.admin).toBe(true);
  });
});
