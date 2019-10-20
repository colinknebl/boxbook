module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
};

// const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

// module.exports = {
//     setupFiles: ['<rootDir>/jest.setup.ts'],
//     testRegex: TEST_REGEX,
//     transform: {
//         '^.+\\.tsx?$': 'babel-jest',
//     },
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//     collectCoverage: false,
// };
