module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
  plugins: [require.resolve("@vanilla-extract/babel-plugin")],
};
