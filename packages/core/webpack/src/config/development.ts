/**
 * Created by: Júnior Conquista (junior.conquista@nuvemshop.com.br)
 */
import { Configuration } from "webpack";

const webpack: Configuration = {
  devtool: "source-map",
  output: {
    // Disable path info
    pathinfo: false,
    // Improve output performance
    clean: {
      keep: /.*/,
    },
    // Use faster hashing algorithm
    hashFunction: "xxhash64",
  },
  optimization: {
    // Only optimize what's safe in a monorepo context
    minimize: false,
    // Keep these disabled to avoid issues with workspace dependencies
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    // Disable in development for faster builds
    providedExports: false,
    usedExports: false,
    sideEffects: false,
  },
  // Enable build cache for faster subsequent builds
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: ".cache/webpack",
    name: `webpack-cache-${process.env.NODE_ENV || "development"}`,
    // Improve cache performance
    compression: "gzip",
    maxAge: 604800000, // 7 days
    store: "pack",
  },
  experiments: {
    // Faster rebuilds
    cacheUnaffected: true,
  },
  // Enable parallel processing
  parallelism: 100,
  // Reduce stat output in development
  stats: "minimal",
  // Improve module resolution performance
  snapshot: {
    // Disables default behavior. Changes in linked deps should not be ignored in builds/watch.
    managedPaths: [],
  },
};

export default webpack;
