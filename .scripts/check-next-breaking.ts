import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { generateNextIndex } from "./generate-next-index";

const rootDir = path.resolve(__dirname, "..");
const nextDir = path.join(rootDir, "packages/react/src/next");

const getExportedComponentDirs = (dir: string): string[] => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(dir, name, "src", "index.ts")))
    .sort();
};

const getGitDirectoriesAtRef = (ref: string, relDir: string): string[] => {
  try {
    const out = execSync(`git ls-tree -d --name-only ${ref}:${relDir}`, {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)
      .sort();
  } catch {
    return [];
  }
};

const run = () => {
  const args = process.argv.slice(2);
  const baseRefIdx = args.indexOf("--base-ref");
  const baseRef =
    baseRefIdx !== -1 && args[baseRefIdx + 1] ? args[baseRefIdx + 1] : "HEAD";

  generateNextIndex(nextDir);

  const baselineComponents = getGitDirectoriesAtRef(
    baseRef,
    "packages/react/src/next"
  );
  const currentComponents = getExportedComponentDirs(nextDir);

  const removedComponents = baselineComponents.filter(
    (name) => !currentComponents.includes(name)
  );

  if (removedComponents.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `❌ Breaking change in @nimbus-ds/components/next against ${baseRef}: removed component(s) ${removedComponents.join(
        ", "
      )}. Follow the Expand-then-Contract / Lockstep Tuple Protocol (Decision 0081 & 0082).`
    );
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log(
    `✅ @nimbus-ds/components/next surface check passed against ${baseRef} (${currentComponents.length} component(s) in /next).`
  );
};

run();
