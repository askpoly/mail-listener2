module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-base/legacy'],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'max-len': [
      'error',
      { code: 100, ignoreComments: true },
    ],
    'no-buffer-constructor': 0,
    'no-param-reassign': 0, // todo legacy reasons, remove,
    'no-shadow': 1, // todo legacy reasons, remove,
    'no-unused-vars': 1, // todo legacy reasons, remove,
    'function-paren-newline': [2, 'consistent'],
    "no-use-before-define": ["error", { "functions": false }]
  },
};
