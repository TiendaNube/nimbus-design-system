import path from "path";
import glob from "glob";
import * as dotenv from "dotenv";
import { PackageBuilder } from "@nimbus-ds/scripts/src";

dotenv.config({
  path: path.join(__dirname, "../.env")
});

try {
  const paths = glob.sync(path.join(".yarn/versions/*.yml"));
  const packageBuilder = new PackageBuilder();
  const packagesToBuild = packageBuilder.getPackagesToBuild(paths);
  packageBuilder.build(packagesToBuild, [
    "nimbus-design-system",
    "nimbus-helper",
    "@nimbus-ds/webpack"
  ]);
} catch (err) {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
}
