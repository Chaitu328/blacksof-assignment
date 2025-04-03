// backend/jest.config.js
module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/__tests__/',
      'jest.setup.js'
    ]
  };