/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import TerserJSPlugin from "terser-webpack-plugin";

const config = {
  // Options similar to the same options in webpackOptions.output
  // both options are optional
};

export const terserJSPlugin = new TerserJSPlugin(config);
