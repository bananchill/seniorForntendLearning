// jest.config.cjs
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: [
        'ts', 'tsx', 'js', 'jsx', 'json'
    ],
    testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            isolatedModules: true
        }
    }
};
