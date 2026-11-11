import fs from "fs";
import path from "path";
import { PackageBuilder } from "@nimbus-ds/scripts/src";

const rootDir = path.resolve(__dirname, "..");

const findPackageJsonFiles = (dir: string, baseRel = ""): string[] => {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const relPath = baseRel ? `${baseRel}/${entry.name}` : entry.name;
    if (relPath === "packages/react/next") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPackageJsonFiles(fullPath, relPath));
    } else if (entry.isFile() && entry.name === "package.json") {
      results.push(relPath);
    }
  }
  return results;
};

const getKnownWorkspacePackages = (): Map<string, string> => {
  const known = new Map<string, string>();
  const pkgJsonFiles = findPackageJsonFiles(
    path.join(rootDir, "packages"),
    "packages"
  );

  for (const relPath of pkgJsonFiles) {
    const content = JSON.parse(
      fs.readFileSync(path.join(rootDir, relPath), "utf8")
    );
    if (content.name) {
      known.set(content.name, content.version || "");
    }
  }
  return known;
};

const extractMajorPackages = (rawYaml: string): string[] => {
  const majorPackages: string[] = [];
  const lines = rawYaml.split(/\r?\n/);
  let inReleases = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (/^releases\s*:/.test(trimmed)) {
      inReleases = true;
      continue;
    }

    if (inReleases && /^[A-Za-z0-9_-]+\s*:/.test(line)) {
      inReleases = false;
    }

    if (inReleases) {
      const match = trimmed.match(
        /^["']?(@nimbus-ds\/[a-z0-9-]+|[a-z0-9-]+)["']?\s*:\s*["']?major["']?\s*(?:#.*)?$/
      );
      if (match && match[1]) {
        majorPackages.push(match[1]);
      }
    }
  }
  return majorPackages;
};

const getVersionManifestFiles = (): string[] => {
  const versionsDir = path.join(rootDir, ".yarn", "versions");
  if (!fs.existsSync(versionsDir)) return [];
  return fs
    .readdirSync(versionsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".yml"))
    .map((entry) => `.yarn/versions/${entry.name}`);
};

const run = () => {
  const allowMajor = process.argv.includes("--allow-major");
  const versionFiles = getVersionManifestFiles();

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

    if (!allowMajor) {
      const majorPackages = extractMajorPackages(raw);
      for (const pkgName of majorPackages) {
        const currentVersion = knownWorkspaces.get(pkgName);
        if (currentVersion !== "0.0.0") {
          errors.push(
            `${relFile}: declares a "major" bump for "${pkgName}" (current version ${
              currentVersion ?? "unknown"
            }). Coexisting Norte UI evolution ships from master as "minor" or "patch" (Decision 0081).`
          );
        }
      }
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
