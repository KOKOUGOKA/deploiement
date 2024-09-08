// tests/user.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');

beforeEach(async () => {
  await User.deleteMany();
});

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/api/users')
    .send({
      username: 'testuser',
      password: 'testpass123',
      role: 'student',