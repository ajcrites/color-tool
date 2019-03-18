module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
  testRegex: '/__tests__/.+\\.test\\.tsx?$',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
};
