import path from "path";
import glob from "glob";
import * as dotenv from "dotenv";
import { PackageBuilder } from "@nimbus-ds/scripts/src";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

try {
  const args = process.argv.slice(2);
  const buildAll =
    args.includes("--all") || args.includes("--all-packages");
  const paths = glob.sync(path.join(".yarn/versions/*.yml"));

  if (!paths.length && !buildAll) {
    console.log(
      "No version manifest files found in .yarn/versions/*.yml. Skipping package build (pass --all to build all packages)."
    );
    process.exit(0);
  }

  const packageBuilder = new PackageBuilder();
  const packagesToBuild = buildAll
    ? ["@nimbus-ds/styles", "@nimbus-ds/components"]
    : packageBuilder.getPackagesToBuildFromPaths(paths);

  const removePackages = [
    "nimbus-design-system",
    "nimbus-helper",
    "@nimbus-ds/webpack",
  ];

  const buildablePackages = packagesToBuild.filter(
    (pkg) => !removePackages.includes(pkg)
  );

  if (!buildablePackages.length) {
    console.log("No eligible packages to build from version manifests.");
    process.exit(0);
  }

  const command = packageBuilder.getCommandBuildNPM(
    buildablePackages,
    removePackages
  );
  packageBuilder.execCommand(command);
} catch (err) {
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
