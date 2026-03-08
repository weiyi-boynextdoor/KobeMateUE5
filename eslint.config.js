import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

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
      "*.uasset",
      "*.umap"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin
    }
  },
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
      "prettier/prettier": "error"
    }
  },
  prettierConfig
];
