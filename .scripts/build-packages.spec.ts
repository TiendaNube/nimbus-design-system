import fs from "fs";
import os from "os";
import path from "path";
import glob from "glob";
import { execFileSync } from "child_process";

jest.mock("glob", () => ({ sync: jest.fn() }));
jest.mock("dotenv", () => ({ config: jest.fn() }));
jest.mock("child_process", () => ({
  execFileSync: jest.fn(),
  execSync: jest.fn()
}));
jest.mock("@nimbus-ds/scripts/src", () =>
  jest.requireActual("@nimbus-ds/scripts/src/packageBuilder")
);

it("builds packages from the second deferred file through the real CLI entrypoint", async () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "build-cli-test-"));
  const first = path.join(temporary, "first.yml");
  const second = path.join(temporary, "second.yml");
  fs.writeFileSync(first, 'releases:\n  "@nimbus-ds/styles": patch\n');
  fs.writeFileSync(second, 'releases:\n  "@nimbus-ds/components": minor\n');
  jest.mocked(glob.sync).mockReturnValue([first, second]);
  try {
    await import("./build-packages");
    expect(execFileSync).toHaveBeenCalledWith(
      "yarn",
      expect.arrayContaining([
        "--filter=@nimbus-ds/styles...",
        "--filter=@nimbus-ds/components..."
      ]),
      { stdio: "inherit" }
    );
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
