module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'Node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1',
    },
};
