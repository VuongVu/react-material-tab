module.exports = {
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react', 'jsx-a11y', 'import', 'redux-saga', 'react-hooks', 'prettier'],
    rules: {
        'no-console': [1],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],

        'arrow-parens': 0,
        'arrow-body-style': 0,
        'object-curly-newline': 0,
        'no-shadow': 0,
        'implicit-arrow-linebreak': 0,
        'operator-linebreak': 0,
        'no-underscore-dangle': 0,
        'max-len': [2, { code: 150 }],
        'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
        'no-param-reassign': [2, { props: true, ignorePropertyModificationsForRegex: ['^state'] }],
        'no-use-before-define': 0,
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],

        'import/prefer-default-export': 0,

        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': 0,
        'react/no-did-mount-set-state': 0,
        'react/display-name': 0,
        'react/jsx-indent': 0,
        'react/no-array-index-key': 0,
        'react/prefer-stateless-function': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/button-has-type': 0,
        'react/require-default-props': 0,
        'react/jsx-wrap-multilines': 0,
        'react/no-did-update-set-state': 0,
        'react/jsx-closing-bracket-location': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-no-bind': 0,

        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-for': 0,

        'redux-saga/no-yield-in-race': 2,
        'redux-saga/yield-effects': 2,

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        'prettier/prettier': 'error',
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
};
