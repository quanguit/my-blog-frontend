const path = require('path');

// Ref: https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
const buildEslintCommand = (filenames) =>
  `yarn lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    () => 'yarn type:check',
    'yarn format:write',
    buildEslintCommand,
  ],
  '*/**/*.{json,md}': ['prettier --write'],
};
