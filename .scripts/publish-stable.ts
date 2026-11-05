import fs from "fs";
import { stableRelease } from "./release/stable";

try {
  const args = process.argv.slice(2);
  const supported = ["--check", "--dry-run", "--validate-only"];
  if (args.some((arg) => !supported.includes(arg)))
    throw new Error("Unknown stable release option");
  const changed = stableRelease({
    check: args.includes("--check") || args.includes("--dry-run"),
    validateOnly: args.includes("--validate-only")
  });
  const message = changed
    ? "Stable release plan verified."
    : "No public releases planned; skipping.";
  process.stdout.write(`${message}\n`);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `released=${changed}\n`);
  }
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`
  );
  process.exitCode = 1;
}
