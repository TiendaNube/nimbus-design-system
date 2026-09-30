import fs from "fs";
import os from "os";
import path from "path";
import {
  listFiles,
  listDirs,
  listRuntimeSourceFiles,
  toPosix,
} from "./fileSystem";

describe("source map filesystem", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = fs.mkdtempSync(path.join(os.tmpdir(), "source-map-fs-"));
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });
  it("handles missing optional directories", () => {
    const missing = path.join(cwd, "missing");
    expect(listFiles(missing)).toEqual([]);
    expect(listDirs(missing)).toEqual([]);
    expect(listRuntimeSourceFiles(missing)).toEqual([]);
  });
  it("sorts files and directories separately and excludes non-runtime trees", () => {
    for (const dir of ["nested", "demo", "__tests__"])
      fs.mkdirSync(path.join(cwd, dir));
    for (const file of [
      "z.ts",
      "a.tsx",
      "a.spec.tsx",
      "a.stories.tsx",
      "demo/demo.ts",
      "__tests__/hidden.ts",
      "nested/helper.ts",
    ])
      fs.writeFileSync(path.join(cwd, file), "");
    expect(listDirs(cwd)).toEqual(["__tests__", "demo", "nested"]);
    expect(listFiles(cwd)).toEqual([
      "a.spec.tsx",
      "a.stories.tsx",
      "a.tsx",
      "z.ts",
    ]);
    expect(
      listRuntimeSourceFiles(cwd).map((file) =>
        toPosix(path.relative(cwd, file))
      )
    ).toEqual(["a.tsx", "nested/helper.ts", "z.ts"]);
  });
});
