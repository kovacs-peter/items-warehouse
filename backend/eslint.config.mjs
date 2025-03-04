import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
