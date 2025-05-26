import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: [
      ".github/**",
      ".husky/**",
      "documentos/**",
      "README.md",
      "package.json",
      "package-lock.json",
      "eslint.config.mjs",
      "commitlint.config.js",
      ".prettierrc",
    ],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@angular-eslint": angular,
      "@angular-eslint/template": angularTemplate,
      prettier: prettierPlugin,
    },
    rules: {
      // Regras gerais do ESLint
      "indent": ["error", 2], // Indentação de 2 espaços
      "max-len": ["error", { code: 80, ignoreComments: false, ignoreStrings: false, ignoreTemplateLiterals: false }],// Máximo de 80 caracteres por linha
      "camelcase": ["error", { allow: ["^[A-Z_]+$"] }], // Exige camelCase para variáveis e funções
      "no-unused-vars": "off", // Desativa a regra nativa do ESLint
      "@typescript-eslint/no-unused-vars": "warn", // Avisa sobre variáveis não utilizadas (TypeScript)
      "curly": ["error", "all"], // Chaves obrigatórias em blocos
      "quotes": ["error", "single"], // Uso de aspas simples

      // Regra para validar convenções de nomenclatura
      "@typescript-eslint/naming-convention": [
        "error",
        {
          // Constantes devem estar em UPPER_CASE
          "selector": "variable",
          "modifiers": ["const"],
          "format": ["UPPER_CASE"],
          "leadingUnderscore": "allow",
          "trailingUnderscore": "allow",
        },
        {
          // Classes devem estar em PascalCase
          "selector": "class",
          "format": ["PascalCase"],
        },
        {
          // Interfaces devem começar com "I" (opcional, se desejar)
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"],
        },
      ],

      // Regras específicas do Angular
      "@angular-eslint/component-class-suffix": ["error", { suffixes: ["Component"] }], // Sufixo 'Component' para componentes
      "@angular-eslint/directive-class-suffix": ["error", { suffixes: ["Directive"] }], // Sufixo 'Directive' para diretivas
      "@angular-eslint/pipe-prefix": ["error", { prefixes: ["app"] }], // Prefixo 'app' para pipes
      "@angular-eslint/component-selector": ["error", { type: "element", prefix: "app", style: "kebab-case" }], // Selector de componentes no formato kebab-case
      "@angular-eslint/directive-selector": ["error", { type: "attribute", prefix: "app", style: "camelCase" }], // Selector de diretivas no formato camelCase
      "@angular-eslint/no-input-prefix": "error", // Evitar prefixos redundantes em inputs
      "@angular-eslint/no-output-on-prefix": "error", // Evitar prefixos 'on' em outputs
      "@angular-eslint/use-lifecycle-interface": "error", // Exigir implementação de interfaces de ciclo de vida
      "@angular-eslint/use-pipe-transform-interface": "error", // Exigir implementação da interface `PipeTransform` em pipes

      // Integração do Prettier
      "prettier/prettier": "warn", // Executa o Prettier como uma regra do ESLint
    },
  },
  prettierConfig, // Desativa regras do ESLint que conflitam com o Prettier
];