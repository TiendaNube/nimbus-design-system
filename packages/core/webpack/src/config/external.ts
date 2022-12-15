/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 * @see https://webpack.js.org/configuration/externals/
 */
export const externalLibs = {
  "@floating-ui/react-dom-interactions": "@floating-ui/react-dom-interactions",
  "@nimbus-ds/styles": "@nimbus-ds/styles",
  "@tiendanube/icons": "@tiendanube/icons",
  react: "react",
  "react-dom": "react-dom",
};

export const externalPackages = {
  "@nimbus-ds/icon": "@nimbus-ds/icon",
  "@nimbus-ds/skeleton": "@nimbus-ds/skeleton",
  "@nimbus-ds/spinner": "@nimbus-ds/spinner",
  "@nimbus-ds/text": "@nimbus-ds/text",
  "@nimbus-ds/title": "@nimbus-ds/title",
  "@nimbus-ds/tokens": "@nimbus-ds/tokens",
};

export const externalItems = { ...externalLibs, ...externalPackages };
