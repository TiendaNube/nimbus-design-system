import fs from "fs";
import { generateSourceMap } from "./SourceMap";
import { writeYaml } from "./writeYaml";
import { makeFixtureRepo, baseConfig } from "./testFixtures";

describe("sharedMetadata", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = makeFixtureRepo();
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });
  it("exposes configured icon assets and generated export names", () => {
    const doc = generateSourceMap(baseConfig(cwd));

    expect(doc.shared.icons).toEqual({
      path: "packages/icons",
      package: "@nimbus-ds/icons",
      assets: "packages/icons/src/assets",
      exportNaming: "arrow-left.svg -> ArrowLeftIcon",
      available: ["ArrowLeftIcon", "InfiniteIcon", "UserCircleIcon"],
    });
  });
  it("does not emit a configured asset path when the directory does not exist", () => {
    const config = baseConfig(cwd);

    config.shared.icons.assets = "packages/icons/src/missing-assets";

    const doc = generateSourceMap(config);

    expect(doc.shared.icons.assets).toBeUndefined();
    expect(doc.shared.icons.available).toBeUndefined();
    expect(doc.shared.icons.exportNaming).toBe(
      "arrow-left.svg -> ArrowLeftIcon"
    );
  });
  it("writes icon metadata to YAML", () => {
    const yaml = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(yaml).toContain('assets: "packages/icons/src/assets"');
    expect(yaml).toContain('export_naming: "arrow-left.svg -> ArrowLeftIcon"');
    expect(yaml).toContain('- "ArrowLeftIcon"');
  });
});
