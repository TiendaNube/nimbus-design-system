import path from "path";

export const convertTsConfigPathsToWebpackAliases = () => {
  const rootDir = path.resolve(__dirname, "../");
  const tsconfig = require("../tsconfig.json");
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths);

  const paths = tsconfigPaths.reduce((aliases, [realPath, mappedPath]: any) => {
    const packageName = mappedPath[0].split("/")[5];
    const alias = `${mappedPath[0]}/${packageName}.tsx`;
    aliases[realPath] = path.join(rootDir, alias);
    return aliases;
  }, {});

  paths["@nimbus-ds/tokens"] = path.join(rootDir, "packages/core/tokens");
  paths["@nimbus-ds/icons"] = path.join(rootDir, "packages/icons");
  paths["@nimbus-ds/styles"] = path.join(
    rootDir,
    "packages/core/styles/src/index.ts"
  );
  paths["@nimbus-ds/webpack"] = path.join(
    rootDir,
    "packages/core/webpack/src/index.ts"
  );
  paths["@nimbus-ds/typings"] = path.join(
    rootDir,
    "packages/core/typings/src/index.ts"
  );
  return paths;
};
