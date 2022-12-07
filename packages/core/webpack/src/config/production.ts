/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import TerserJSPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";

const webpack: Configuration = {
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({})],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default webpack;
