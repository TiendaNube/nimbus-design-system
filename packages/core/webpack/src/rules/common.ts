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
     * ts-loader receives no `configFile`, so it resolves the nearest
     * `tsconfig.json` walking up from the package being built. Most packages
     * ship their own, scoped to `include: ["./src"]`, and are therefore
     * unaffected — but `@nimbus-ds/typings`, `@nimbus-ds/icons` and
     * `@nimbus-ds/segmented-control` have none, so they reach the one at the
     * root of the monorepo and inherit its repository-wide `include`: every
     * file under `packages`, plus the generated ones those files import
     * (`packages/icons/tmp` through the `@nimbus-ds/icons` alias, each
     * package's `dist`).
     *
     * Turbo builds independent packages in parallel, so those three would
     * type-check files that another build is rewriting at that very moment and
     * fail on a half-written one — for instance TS1208 on an svgr icon still
     * being emitted, which is what broke the `publish-release` workflow.
     *
     * Scoping diagnostics to the dependency graph makes the resolved
     * `tsconfig.json` irrelevant to the outcome, so no package depends on
     * having a local one to stay isolated. Type coverage of files outside the
     * graph (stories, specs) still comes from `yarn types:check`, which runs
     * `tsc` over the whole program on every pull request and before every push.
     */
    onlyCompileBundledFiles: true,
  },
};
