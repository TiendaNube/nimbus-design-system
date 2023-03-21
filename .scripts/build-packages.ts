const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { execSync } = require("child_process");

const run = () => {
  const paths = glob.sync(path.join(".yarn/versions/*.yml"));
  if (!paths.length) {
    throw new Error(
      "The versions file was not found so it was not possible to perform the build..."
    );
  }

  const source = fs.readFileSync(paths[0], "utf8");

  const packages = source
    ?.match(/"\@\w+\-\w+\/\w+?-?\w+": (minor|major|patch)/gm)
    ?.reduce((prev, curr) => {
      const packageName = curr.replace(/(: (minor|major|patch)|")/gm, "");

      prev = prev + ` --filter=${packageName}...`;
      return prev;
    }, "");

  if (packages) {
    console.log(`\x1b[32m 🏃‍♂️ Running building packages... \x1b[0m`);
    const execOpts = { stdio: "inherit" };
    execSync(
      `turbo run build --filter=!@nimbus-ds/webpack ${packages}`,
      execOpts
    );
  }
};

try {
  run();
} catch (err) {
  console.error(`\x1b[33m ${err.message} \x1b[0m`);
  process.exit(1);
}
