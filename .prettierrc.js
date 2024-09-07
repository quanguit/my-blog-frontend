/** @type {import("prettier").Config} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  useTabs: false,
  endOfLine: 'lf',
  trailingComma: 'all',
  semi: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};

module.exports = config;
