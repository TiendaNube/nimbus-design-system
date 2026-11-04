import childProcess from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { PackageBuilder } from "./PackageBuilder";

let temporary: string;
beforeEach(() => {
  temporary = fs.mkdtempSync(path.join(os.tmpdir(), "builder-test-"));
});
afterEach(() => {
  fs.rmSync(temporary, { recursive: true, force: true });
});

it("unions all deferred records including the aggregate and ignores declined packages", () => {
  const first = path.join(temporary, "first.yml");
  const second = path.join(temporary, "second.yml");
  fs.writeFileSync(
    first,
    'releases:\n  "@nimbus-ds/styles": patch\ndeclined:\n  - ignored\n'
  );
  fs.writeFileSync(
    second,
    "releases:\n  '@nimbus-ds/components': minor # aggregate\n  '@nimbus-ds/styles': minor\n"
  );
  expect(new PackageBuilder().getPackagesToBuild([first, second])).toEqual([
    "@nimbus-ds/styles",
    "@nimbus-ds/components",
  ]);
});

it("does not generate an unfiltered turbo command for an empty selection", () => {
  expect(new PackageBuilder().getCommandBuildNPM([])).toBe("");
});

it("does not build anything from a declined-only record", () => {
  const file = path.join(temporary, "declined.yml");
  fs.writeFileSync(file, "declined:\n  - nimbus-design-system\n");
  expect(new PackageBuilder().getPackagesToBuild(file)).toEqual([]);
});

it("rejects an unsupported release record instead of omitting it", () => {
  const file = path.join(temporary, "invalid.yml");
  fs.writeFileSync(file, 'releases:\n  "@nimbus-ds/styles": {invalid: true}\n');
  expect(() => new PackageBuilder().getPackagesToBuild(file)).toThrow(
    "Unsupported"
  );
});


it("never invokes turbo for an empty or fully excluded selection", () => {
  const execute = jest.spyOn(childProcess, "execFileSync").mockReturnValue("");
  try {
    const builder = new PackageBuilder();
    builder.build([]);
    builder.build(["excluded"], ["excluded"]);
    expect(execute).not.toHaveBeenCalled();
  } finally {
    execute.mockRestore();
  }
});

it("builds the aggregate and dependencies with argument arrays and a forced refresh", () => {
  const execute = jest.spyOn(childProcess, "execFileSync").mockReturnValue("");
  try {
    new PackageBuilder().build(["@nimbus-ds/components"], [], true);
    expect(execute).toHaveBeenCalledWith(
      "yarn",
      ["turbo", "run", "build", "--force", "--filter=@nimbus-ds/components..."],
      { stdio: "inherit" }
    );
  } finally {
    execute.mockRestore();
  }
});
