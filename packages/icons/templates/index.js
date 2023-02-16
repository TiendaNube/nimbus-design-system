const path = require("path");

module.exports = (filePaths) => {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `${basename}` : `${basename}Icon`;

    return `export { ${exportName} } from './${basename}'`;
  });

  return exportEntries.join("\n");
};
