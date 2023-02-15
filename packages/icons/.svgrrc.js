const template = require("./templates/components");
const indexTemplate = require("./templates/index");

module.exports = {
  typescript: true,
  icon: true,
  svgProps: {
    fill: "currentColor",
    height: "{sizes[size] || Number(size) || 0}",
    width: "{sizes[size] || Number(size) || 0}",
  },
  template,
  indexTemplate,
};
