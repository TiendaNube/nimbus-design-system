/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import type { Configuration } from "webpack";
import { cssMinimizerPlugin, terserJSPlugin } from "../plugins";

const webpack: Configuration = {
  optimization: {
    minimize: true,
    minimizer: [terserJSPlugin, cssMinimizerPlugin],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default webpack;
