import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

it("prints a hostile PR body literally without shell execution", () => {
  const workflow = fs.readFileSync(
    ".github/workflows/create-github-relase.yml",
    "utf8"
  );
  const block = workflow
    .split('- name: "Show return"')[1]
    .split("- name: Create Release")[0];
  const script = block
    .split("run: |\n")[1]
    .split("\n")
    .map((line) => line.replace(/^ {10}/, ""))
    .join("\n")
    .trim();
  const temporary = fs.mkdtempSync(
    path.join(os.tmpdir(), "release-body-test-")
  );
  const marker = path.join(temporary, "executed");
  const body = `quotes: " ' ; $(touch ${marker})\n\`touch ${marker}\`\nmultiline body`;
  try {
    const output = execFileSync("bash", ["-c", script], {
      encoding: "utf8",
      env: { ...process.env, PREVIOUS_TAG: "v1.0.0", PR_BODY: body }
    });
    expect(output).toBe(`Tag: v1.0.0\nBody: ${body}\n`);
    expect(fs.existsSync(marker)).toBe(false);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
