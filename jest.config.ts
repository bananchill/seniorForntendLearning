/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
    coverageProvider: 'babel',
    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    setupFilesAfterEnv: [],
    testEnvironment: 'node',
    transform: {
        // '\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
        '^.+.[jt]sx?$': ['ts-jest', { isolatedModules: true }],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(unist-util-visit|unist-util-is|unist-util-select|unist-util-parents|unist-util-visit-parents|unist-util-position|unist-util-remove-position|unist-util-generated)/)',
    ],

};

export default config;