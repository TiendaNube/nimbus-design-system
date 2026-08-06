/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */

/**
 * @see https://webpack.js.org/guides/typescript/#loader
 */
export const typescriptRule = {
  test: /\.tsx?$/,
  loader: "ts-loader",
  exclude: /node_modules/,
  options: {
    /**
     * Report diagnostics only for the files this bundle actually imports.
     *
     * No package has its own `tsconfig.json`, so ts-loader resolves the one at
     * the root of the monorepo and builds a program out of its `include` globs
     * — every file under `packages`, plus the generated ones its imports reach
     * (`packages/icons/tmp` via the `@nimbus-ds/icons` alias, each package's
     * `dist`). Turbo builds independent packages in parallel, so a package
     * such as `@nimbus-ds/typings` would type-check files that another build
     * is rewriting at that very moment and fail on a half-written one (for
     * instance TS1208 on a freshly emitted svgr icon).
     *
     * Repository-wide type coverage is not lost: `yarn types:check` runs `tsc`
     * over the whole program on every pull request and before every push.
     */
    onlyCompileBundledFiles: true,
  },
};
