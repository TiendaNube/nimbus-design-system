const template = require("./templates/components");
const indexTemplate = require("./templates/index");

module.exports = {
  template,
  indexTemplate,
  typescript: true,
  icon: true,
  svgProps: {
    height: "{sizes[size] || Number(size) || 0}",
    width: "{sizes[size] || Number(size) || 0}",
  },
};
