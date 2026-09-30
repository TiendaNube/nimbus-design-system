import fs from "fs";
import { generateSourceMap } from "./SourceMap";
import { makeFixtureRepo, baseConfig } from "./testFixtures";

describe("dependencies", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = makeFixtureRepo();
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("ignores spec, test, story and demo imports when collecting dependencies", () => {
    const doc = generateSourceMap(baseConfig(cwd));

    const box = doc.components.find((component) => component.name === "Box");

    expect(box?.dependencies).toEqual([
      "@nimbus-ds/skeleton",
      "@nimbus-ds/styles",
    ]);

    expect(box?.dependencies).not.toContain("@nimbus-ds/button");

    expect(box?.dependencies).not.toContain("@nimbus-ds/tooltip");

    expect(box?.dependencies).not.toContain("@nimbus-ds/icon");

    expect(box?.dependencies).not.toContain("@nimbus-ds/text");
  });

  it("includes Nimbus named and wildcard re-exports in dependencies", () => {
    const doc = generateSourceMap(baseConfig(cwd));

    const reexporter = doc.components.find(
      (component) => component.name === "Reexporter"
    );

    expect(reexporter?.dependencies).toEqual([
      "@nimbus-ds/button",
      "@nimbus-ds/typings",
    ]);
  });
});
