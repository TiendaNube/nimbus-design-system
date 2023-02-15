module.exports = {
  multipass: true, // boolean. false by default
  plugins: [
    "removeTitle",
    "removeStyleElement",
    {
      name: "removeAttrs",
      params: {
        attrs: "(id|class|data-name|fill|transform|href|clip-path|clip-rule)",
      },
    },
    {
      name: "preset-default",
      params: {
        overrides: {
          // or disable plugins
          removeViewBox: false,
        },
      },
    },
    "prefixIds",
    "removeEmptyContainers",
    "sortAttrs",
    "removeUselessDefs",
    "removeEmptyText",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeHiddenElems",
    "collapseGroups",
  ],
};
