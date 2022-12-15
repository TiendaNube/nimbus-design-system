/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import { Configuration } from "webpack";
import TerserJSPlugin from "terser-webpack-plugin";

const webpack: Configuration = {
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({})],
  },
};

export default webpack;
