/**
 * External libraries that are required at runtime but should not be bundled.
 * These are typically third-party dependencies or internal Nimbus packages that are expected to be available
 * in the consuming application's environment.
 */
export const externalLibs = {
  "@floating-ui/react": "@floating-ui/react",
  "@nimbus-ds/styles": "@nimbus-ds/styles",
  react: "react",
  "react-dom": "react-dom",
};

/**
 * Internal Nimbus sub-packages that should be treated as external dependencies.
 * These are packages within our monorepo that are commonly used across multiple components.
 * By marking them as external:
 * - Prevents duplicate bundling of the same code
 * - Reduces bundle sizes
 *
 * When adding a new package here, consider:
 * 1. Is it used by multiple components?
 * 2. Is it a fundamental building block of the design system?
 * 3. Would bundling it multiple times be inefficient?
 * @see https://webpack.js.org/configuration/externals/
 */
export const externalPackages = {
  "@nimbus-ds/icon": "@nimbus-ds/icon",
  "@nimbus-ds/skeleton": "@nimbus-ds/skeleton",
  "@nimbus-ds/icons": "@nimbus-ds/icons",
  "@nimbus-ds/spinner": "@nimbus-ds/spinner",
  "@nimbus-ds/text": "@nimbus-ds/text",
  "@nimbus-ds/title": "@nimbus-ds/title",
  "@nimbus-ds/tokens": "@nimbus-ds/tokens",
  "@nimbus-ds/box": "@nimbus-ds/box",
  "@nimbus-ds/chip": "@nimbus-ds/chip",
  "@nimbus-ds/progress-bar": "@nimbus-ds/progress-bar",
};

export const externalItems = { ...externalLibs, ...externalPackages };
