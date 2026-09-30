import fs from "fs";
import { generateSourceMap } from "./SourceMap";
import { makeFixtureRepo, baseConfig } from "./testFixtures";

describe("publicExports", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = makeFixtureRepo();
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("resolves public exports from a TSX package entrypoint", () => {
    const doc = generateSourceMap(baseConfig(cwd));

    expect(doc.conventions.entry).toBe("src/index.ts(x)");

    const component = doc.components.find((entry) => entry.name === "TsxEntry");

    expect(component?.exports).toEqual([
      "TsxEntry",
      "TsxEntryProps",
      "default",
    ]);
  });
});
