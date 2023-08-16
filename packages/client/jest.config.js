import dotenv from 'dotenv';

dotenv.config();

export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
    globals: {
        __SERVER_PORT__: process.env.SERVER_PORT,
    },
    verbose: true,
    transform: {
        '\\.(svg|png)$': '<rootDir>/__mocks__/svg.cjs',
    },
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        'jest-transform-stub',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@ui(.*)$': '<rootDir>/src/components/ui/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
