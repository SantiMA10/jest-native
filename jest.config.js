const ignores = ['/node_modules/', '/__tests__/helpers/', '__mocks__'];

module.exports = {
  preset: 'native-testing-library',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)'],
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: [...ignores],
};
