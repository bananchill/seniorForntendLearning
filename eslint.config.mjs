import tseslint from 'typescript-eslint'
import functional from 'eslint-plugin-functional'
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      prettier
    ],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      functional
    },
    rules: {
      'functional/immutable-data': 'error',
      'functional/no-let': 'error',
      'functional/no-this-expressions': 'error',
      'functional/prefer-readonly-type': 'error'
    }
  }
)
