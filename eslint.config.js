import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "node_modules/",
      "Binaries/",
      "Intermediate/",
      "Saved/",
      "DerivedDataCache/",
      "Build/",
      "Content/",
      "Plugins/",
      "Typing/",
      "*.uasset",
      "*.umap"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["TypeScript/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 4]
    }
  }
];
