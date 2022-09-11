// http://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
    },
    env: {
        node: true,
    },
    // https://github.com/airbnb/javascript
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["@typescript-eslint", "unused-imports", "sort-imports-es6-autofix", "prettier"],
    settings: {
        "import/resolver": {
            typescript: {
                project: ".",
            },
        },
    },
    rules: {
        // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/docs/rules
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/lines-between-class-members": [
            "error",
            "always",
            {
                exceptAfterOverload: true,
                exceptAfterSingleLine: true,
            },
        ],

        // http://eslint.org/docs/rules/
        "no-empty-pattern": "off",
        "newline-before-return": "error",
        curly: "error",
        "eol-last": ["error", "always"],
        "no-alert": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "newline-after-var": ["error", "always"],
        "one-var": ["error", "never"],
        "padded-blocks": [
            "error",
            {
                classes: "never",
                blocks: "never",
            },
        ],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
        "padding-line-between-statements": [
            "error",
            { blankLine: "always", prev: "*", next: "export" },
            { blankLine: "never", prev: ["let", "const"], next: ["let", "const"] },
            { blankLine: "always", prev: "cjs-import", next: ["let", "const"] },
            { blankLine: "never", prev: "cjs-import", next: "cjs-import" },
            { blankLine: "always", prev: "block-like", next: "*" },
            { blankLine: "always", prev: "*", next: "block-like" },
        ],

        // https://github.com/marudor/eslint-plugin-sort-imports-es6-autofix
        "sort-imports-es6-autofix/sort-imports-es6": [
            "error",
            {
                ignoreCase: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
            },
        ],

        // https://github.com/sweepline/eslint-plugin-unused-imports
        "unused-imports/no-unused-imports-ts": "error",
    },
    ignorePatterns: ["dist"],
};
