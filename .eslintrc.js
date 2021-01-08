// http://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
    },
    env: {
        node: true,
    },
    // https://github.com/airbnb/javascript
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    plugins: [
        'import',
        'unused-imports',
        'sort-keys-fix',
        'sort-imports-es6-autofix',
    ],
    settings: {
        'import/resolver': {
            'typescript': {
                'project': '.',
            },
        },
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',

        // Typescript Rules
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/brace-style': 'error',
        '@typescript-eslint/func-call-spacing': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error', {
                'args': 'none',
            },
        ],
        '@typescript-eslint/space-before-function-paren': [
            'error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always',
            },
        ],

        // Disable ESLint Rules
        'arrow-parens': 'off',
        'brace-style': 'off',
        'func-call-spacing': 'off',
        'no-empty-function': 'off',
        'prefer-const': 'off',
        'semi': 'off',
        'space-before-function-paren': 'off',

        // ESLint Rules : http://eslint.org/docs/rules/
        'semi-spacing': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'key-spacing': ['error', { 'mode': 'strict' }],
        'indent': ['error', 4],
        'keyword-spacing': 'error',
        'space-infix-ops': 'error',
        'newline-before-return': 'error',
        'function-paren-newline': ['error', 'multiline'],
        'curly': 'error',
        'arrow-spacing': 'error',
        'space-before-blocks': 'error',
        'quotes': [
            'error', 'single',
            {
                'allowTemplateLiterals': true,
            },
        ],
        'eol-last': ['error', 'always'],
        'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'generator-star-spacing': ['error', { 'before': true, 'after': true }],
        'lines-between-class-members': 'error',
        'object-curly-spacing': ['error', 'always'],
        'padded-blocks': [
            'error', {
                'classes': 'always',
                'blocks': 'never',
            },
        ],
        'newline-after-var': ['error', 'always'],
        'one-var': ['error', 'never'],
        'no-multiple-empty-lines': [
            'error',
            { 'max': 1, 'maxBOF': 0, 'maxEOF': 0 },
        ],
        'space-unary-ops': [
            'error', {
                'nonwords': true,
                'overrides': {
                    '++': false,
                    '--': false,
                },
            },
        ],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'export' },
            { blankLine: 'never', prev: 'export', next: 'export' },
            { blankLine: 'never', prev: ['let', 'const'], next: ['let', 'const'] },
            { blankLine: 'always', prev: 'cjs-import', next: ['let', 'const'] },
            { blankLine: 'never', prev: 'cjs-import', next: 'cjs-import' },
            { blankLine: 'always', prev: 'block-like', next: '*' },
            { blankLine: 'always', prev: '*', next: 'block-like' },
        ],
        'sort-imports-es6-autofix/sort-imports-es6': [
            'error', {
                'ignoreCase': true,
                'ignoreMemberSort': false,
                'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
            },
        ],

        // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 'error',
        'import/order': [
            'error', {
                'groups': [],
                'newlines-between': 'never',
            },
        ],
        'import/named': 'off',
        'import/first': 'error',
        'import/no-unassigned-import': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-deprecated': 'error',

        // https://github.com/sweepline/eslint-plugin-unused-imports
        'unused-imports/no-unused-imports-ts': 'error',
    },
    overrides: [
        {
            files: [
                '__tests__/*.{j,t}s?(x)',
                'tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                'jest': true,
            },
        },
    ],
};
