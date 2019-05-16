module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "standard",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "semi": 0,
        "generator-star-spacing": [
            "error",
            {"before": false, "after": true}
        ],
        "comma-dangle": ["error", "only-multiline"]
    }
};