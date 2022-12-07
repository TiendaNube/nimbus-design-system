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
};
