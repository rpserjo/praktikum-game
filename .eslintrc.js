module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'airbnb'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'indent': ['error', 4],
        'react/jsx-indent' : ['error', 4],
        'comma-dangle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    },
}
