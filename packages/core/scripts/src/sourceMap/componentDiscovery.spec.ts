import fs from "fs";
import path from "path";
import { generateSourceMap } from "./SourceMap";
import { makeFixtureRepo, baseConfig } from "./testFixtures";

/**
 * Asserts that source-map generation fails with the expected error.
 */
function expectGenerationToThrow(cwd: string, expected: RegExp): void {
  expect(() => generateSourceMap(baseConfig(cwd))).toThrow(expected);
}
describe("componentDiscovery", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = makeFixtureRepo();
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });
  it("resolves a plain component with navigation metadata", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const box = doc.components.find((component) => component.name === "Box");

    expect(box).toEqual({
      name: "Box",
      group: "atomic",
      package: "@nimbus-ds/box",
      path: "packages/react/src/atomic/Box",
      styles: "packages/core/styles/src/packages/atomic/box",
      exports: ["Box", "BoxProps", "default"],
      dependencies: ["@nimbus-ds/skeleton", "@nimbus-ds/styles"],
      extras: ["src/box.test.tsx", "src/demo/"],
    });
  });
  it("reads package names directly from component manifests", () => {
    const doc = generateSourceMap(baseConfig(cwd));

    expect(
      doc.components.find((component) => component.name === "Box")?.package
    ).toBe("@nimbus-ds/box");
    expect(
      doc.components.find((component) => component.name === "Table")?.package
    ).toBe("@nimbus-ds/table");
  });
  it("throws when a component manifest has no package name", () => {
    fs.writeFileSync(
      path.join(cwd, "packages/react/src/atomic/Box/package.json"),
      "{}"
    );
    expectGenerationToThrow(cwd, /Missing package name/);
  });
  it("resolves nested subcomponents and public subcomponent exports", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const table = doc.components.find(
      (component) => component.name === "Table"
    );

    expect(table?.nested).toEqual(["TableRow"]);
    expect(table?.contexts).toEqual(["TableContext"]);
    expect(table?.exports).toEqual([
      "Table",
      "TableColumnLayout",
      "TableProps",
      "TableRow",
      "TableRowProps",
      "default",
    ]);
    expect(table?.styles).toBe(
      "packages/core/styles/src/packages/composite/table"
    );
    expect(table?.extras).toEqual(["src/Table.definitions.ts"]);
  });
  it("puts a sibling top-level export and an unrelated directory in extras", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const slider = doc.components.find(
      (component) => component.name === "Slider"
    );

    expect(slider?.extras).toEqual([
      "src/SliderRange.tsx",
      "src/hooks/",
      "src/sliderRange.stories.tsx",
    ]);
  });
  it("throws on a genuine implementation ambiguity", () => {
    const componentDir = path.join(cwd, "packages/react/src/atomic/Box/src");

    fs.writeFileSync(path.join(componentDir, "box_.tsx"), "");
    expectGenerationToThrow(cwd, /Ambiguous implementation/);
  });
});
