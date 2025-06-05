import glob from "glob";
import path from "path";

import {
  Docgen,
  DocgenOptions,
  defaultCompilerOptionsDocgen,
} from "@nimbus-ds/scripts/src";
import tsconfig from "../tsconfig.json";
import fs from "fs";

try {
  const paths = {
    components: glob.sync(
      path.join("packages/react/src/*/*/src/!(*.spec|*.stories).types.ts")
    ),
    subComponents: glob.sync(
      path.join(
        "packages/react/src/*/*/src/components/*/!(*.spec|*.stories).types.ts"
      )
    ),
  };

  const options: DocgenOptions = {
    compilerOptions: {
      ...defaultCompilerOptionsDocgen,
      paths: tsconfig.compilerOptions.paths,
    },
  };
  const docgen = new Docgen(options);
  const docs = docgen.generate(paths);

  console.log("Package documentation generated successfully");

  const bundlePropsOutPath = path.join(
    "packages/react/dist/components-props.json"
  );

  if (!fs.existsSync(path.dirname(bundlePropsOutPath))) {
    fs.mkdirSync(path.dirname(bundlePropsOutPath));
  }

  docgen.generateBundle(docs, bundlePropsOutPath);

  console.log("Bundle documentation generated successfully");
} catch (err) {
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
