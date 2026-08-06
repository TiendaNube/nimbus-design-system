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
     * `tsconfig.json` walking up from the package being built, and every
     * package now ships one scoped to its own sources. That scoping is what
     * keeps a build isolated: turbo builds independent packages in parallel,
     * and a config whose `include` reaches the whole repository pulls in files
     * another build is rewriting at that very moment — which is how a
     * `@nimbus-ds/typings` build came to fail on a half-written svgr icon and
     * broke the `publish-release` workflow.
     *
     * This option is the second half of that defence, not a replacement for
     * it. It restricts *source* diagnostics to the files each entry imports,
     * so a stray `.ts`/`.tsx` selected by the resolved config no longer
     * matters. Declaration files still come from that config, so a `.d.ts`
     * under someone else's `dist` would still be read — hence both parts.
     *
     * Type coverage of files outside the dependency graph (stories, specs)
     * comes from `yarn types:check`, which runs `tsc` over the whole program
     * on every pull request and before every push.
     */
    onlyCompileBundledFiles: true,
  },
};
