module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "standard",
        "plugin:react/recommended",
        "plugin:jsdoc/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "*html"
            ],
            parser:"@html-eslint/parser",
            "parserOptions": {
                "sourceType": "script"
            },
            extends: ["plugin:@html-eslint/recommended"],
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react",
        '@html-eslint',
        'jsdoc'
    ],
    "rules": {
        "id-match": ["error", "^[a-z]+([A-Z][a-z]+)*$"],
        "@html-eslint/id-naming-convention": ["error", "kebab-case"],
        "new-cap":"off"
    }
}
