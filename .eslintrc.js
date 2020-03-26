module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ['airbnb', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    parser: 'babel-eslint',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
    },
};
