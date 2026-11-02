import fs from "fs";
import path from "path";
import glob from "glob";
import { PackageBuilder } from "@nimbus-ds/scripts/src";

const rootDir = path.resolve(__dirname, "..");

const getKnownWorkspacePackages = (): Set<string> => {
  const known = new Set<string>();
  const pkgJsonFiles = glob.sync("packages/**/package.json", {
    cwd: rootDir,
    ignore: ["**/node_modules/**", "**/dist/**", "packages/react/next/**"],
  });

  for (const relPath of pkgJsonFiles) {
    const content = JSON.parse(
      fs.readFileSync(path.join(rootDir, relPath), "utf8")
    );
    if (content.name) {
      known.add(content.name);
    }
  }
  return known;
};

const run = () => {
  const allowMajor = process.argv.includes("--allow-major");
  const versionFiles = glob.sync(".yarn/versions/*.yml", { cwd: rootDir });

  if (versionFiles.length === 0) {
    // eslint-disable-next-line no-console
    console.log("✅ No pending .yarn/versions/*.yml files to validate.");
    return;
  }

  const knownWorkspaces = getKnownWorkspacePackages();
  const builder = new PackageBuilder();
  const errors: string[] = [];

  for (const relFile of versionFiles) {
    const fullPath = path.join(rootDir, relFile);
    const raw = fs.readFileSync(fullPath, "utf8");
    const packages = builder.getPackagesToBuild(fullPath);

    for (const pkgName of packages) {
      if (!knownWorkspaces.has(pkgName)) {
        errors.push(
          `${relFile}: references unknown workspace package "${pkgName}". Note: Path D (/next) components ship through "@nimbus-ds/components", never as individual packages (Decision 0082).`
        );
      }
    }

    if (!allowMajor && /:\s*["']?major["']?\s*$/m.test(raw)) {
      errors.push(
        `${relFile}: declares a "major" bump. Coexisting Norte UI evolution ships from master as "minor" or "patch" (Decision 0081).`
      );
    }
  }

  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.error("❌ Version declaration validation failed:");
    for (const err of errors) {
      // eslint-disable-next-line no-console
      console.error(`   - ${err}`);
    }
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log(
    `✅ Validated ${versionFiles.length} version manifest(s) in .yarn/versions/.`
  );
};

run();
