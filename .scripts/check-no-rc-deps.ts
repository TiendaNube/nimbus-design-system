import fs from "fs";
import path from "path";

const rootDir = path.resolve(__dirname, "..");

const findPackageJsonFiles = (dir: string, baseRel = ""): string[] => {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const relPath = baseRel ? `${baseRel}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPackageJsonFiles(fullPath, relPath));
    } else if (entry.isFile() && entry.name === "package.json") {
      results.push(relPath);
    }
  }
  return results;
};

const run = () => {
  const pkgFiles = [
    "package.json",
    ...findPackageJsonFiles(path.join(rootDir, "packages"), "packages"),
  ];

  const violations: string[] = [];
  const fields = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "resolutions",
  ] as const;

  for (const relFile of pkgFiles) {
    const fullPath = path.join(rootDir, relFile);
    const pkg = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    for (const field of fields) {
      const deps = pkg[field];
      if (!deps || typeof deps !== "object") continue;
      for (const [depName, range] of Object.entries(deps)) {
        if (typeof range !== "string") continue;
        if (
          depName.startsWith("@nimbus-ds/") &&
          (range.includes("-rc.") ||
            range.startsWith("file:") ||
            range.startsWith("link:"))
        ) {
          violations.push(`${relFile} -> ${field}.${depName}: "${range}"`);
        }
      }
    }
  }

  const yarnLockPath = path.join(rootDir, "yarn.lock");
  if (fs.existsSync(yarnLockPath)) {
    const lockContent = fs.readFileSync(yarnLockPath, "utf8");
    const rcMatches = lockContent.match(
      /"@nimbus-ds\/[^@\n]+@(?:npm:)?[^"\n]*-rc\.[^"\n]*"/g
    );
    if (rcMatches?.length) {
      for (const match of rcMatches) {
        violations.push(`yarn.lock -> ${match}`);
      }
    }
  }

  if (violations.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      "❌ Pre-release (-rc.) or local file: dependencies on @nimbus-ds/* are not allowed on master:"
    );
    for (const v of violations) {
      // eslint-disable-next-line no-console
      console.error(`   - ${v}`);
    }
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log("✅ No -rc. or file: @nimbus-ds/* dependencies detected.");
};

run();
