/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import { Configuration } from "webpack";
import { terserJSPlugin } from "../plugins";

const webpack: Configuration = {
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [terserJSPlugin],
  },
};

export default webpack;
