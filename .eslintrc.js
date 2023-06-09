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
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 2,
        'operator-linebreak': ['error', 'after'],
        'max-len': ['error', { code: 100 }],
        'react/jsx-boolean-value': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'comma-dangle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/function-component-definition': 'off',
        'react/button-has-type': 'off',
        'react/require-default-props': 'off',
        'object-curly-newline': 'off',
        'linebreak-style': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'no-unused-expressions': ['error', { 'allowTernary': true }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "operator-linebreak": ["error", "before"]
        
    },
};
