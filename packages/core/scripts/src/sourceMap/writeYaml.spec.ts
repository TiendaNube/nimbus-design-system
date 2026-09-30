import fs from "fs";
import { generateSourceMap } from "./SourceMap";
import { writeYaml } from "./writeYaml";
import { makeFixtureRepo, baseConfig } from "./testFixtures";

describe("writeYaml", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = makeFixtureRepo();
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("writes navigation metadata to YAML", () => {
    const yaml = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(yaml).toContain('path: "packages/react/src/atomic/Box"');

    expect(yaml).toContain(
      'styles: "packages/core/styles/src/packages/atomic/box"'
    );

    expect(yaml).toContain('exports: ["Box", "BoxProps", "default"]');

    expect(yaml).toContain(
      'dependencies: ["@nimbus-ds/skeleton", "@nimbus-ds/styles"]'
    );
  });

  it("quotes every string so YAML-like values stay strings", () => {
    const config = baseConfig(cwd);

    config.repoName = "2026-09-15";

    const yaml = writeYaml(generateSourceMap(config));

    expect(yaml).toContain('name: "2026-09-15"');
  });

  it("quotes scoped package names", () => {
    const yaml = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(yaml).toContain('package: "@nimbus-ds/box"');

    expect(yaml).not.toMatch(/package: @/);
  });

  it("carries no volatile field", () => {
    const yaml = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(yaml).not.toMatch(/\b\d{4}-\d{2}-\d{2}T/);

    expect(yaml.toLowerCase()).not.toMatch(
      /generated[_-]?at|generator[_-]?version|source[_-]?sha/
    );
  });
});
