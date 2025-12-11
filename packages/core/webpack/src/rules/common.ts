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
    // Enable type checking in a separate process
    transpileOnly: true,
    compilerOptions: {
      // Skip type checking
      isolatedModules: true,
      // Improve module resolution speed
      moduleResolution: "node",
      // Use incremental compilation
      incremental: true,
    },
  },
};
