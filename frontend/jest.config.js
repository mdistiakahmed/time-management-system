module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testTimeout: 10000,
  collectCoverageFrom: [
    '**/*.tsx',
    '**/!(index)*.ts',
    "!<rootDir>/node_modules/",
    "!<rootDir>/dist/"
  ]
};