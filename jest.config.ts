/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/__tests__/*.{js, ts}'],
    moduleNameMapper: { 'src/(.*)': '<rootDir>/src/$1' },
    moduleDirectories: ['node_modules', 'src']
};
