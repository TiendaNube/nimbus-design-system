import fs from "fs";
import os from "os";
import path from "path";
import { execSync } from "child_process";
import { generateSourceMap } from "./SourceMap";
import { writeYaml } from "./writeYaml";
import type { SourceMapConfig } from "./SourceMap.types";

jest.mock("child_process");

const BASE_COMMANDS: SourceMapConfig["commands"] = {
  install: "yarn install --immutable",
  buildAll: "yarn build",
  testAll: "yarn test",
  lint: "yarn lint",
  typesCheck: "yarn types:check",
  storybook: "yarn storybook",
  buildStorybook: "yarn build:storybook",
  buildOne: "yarn workspace {package} build",
  testOne: "yarn jest {path}",
};

/**
 * Builds a throwaway repo tree so `generateSourceMap` can run against real
 * files instead of a mocked filesystem — the generator's whole job is
 * reading a real tree, so a fixture tree is what actually exercises it.
 */
function makeFixtureRepo(): string {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "source-map-fixture-"));
  const write = (relPath: string, content = "") => {
    const full = path.join(cwd, relPath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  };

  // A plain component: entry, impl, types, test, stories, generated docs.
  write("packages/react/src/atomic/Box/package.json", "{}");
  write("packages/react/src/atomic/Box/src/index.ts");
  write("packages/react/src/atomic/Box/src/Box.tsx");
  write("packages/react/src/atomic/Box/src/box.types.ts");
  write("packages/react/src/atomic/Box/src/box.spec.tsx");
  write("packages/react/src/atomic/Box/src/box.stories.tsx");
  write("packages/react/src/atomic/Box/src/box.docs.json");

  // Nested subcomponents + a context, mixed casing on the sub files.
  write("packages/react/src/composite/Table/package.json", "{}");
  write("packages/react/src/composite/Table/src/index.ts");
  write("packages/react/src/composite/Table/src/Table.tsx");
  write("packages/react/src/composite/Table/src/table.types.ts");
  write("packages/react/src/composite/Table/src/Table.definitions.ts");
  write(
    "packages/react/src/composite/Table/src/components/TableRow/TableRow.tsx"
  );
  write(
    "packages/react/src/composite/Table/src/contexts/TableContext/TableContext.tsx"
  );

  // A sibling top-level export (Slider/SliderRange) plus an unrelated dir.
  write("packages/react/src/atomic/Slider/package.json", "{}");
  write("packages/react/src/atomic/Slider/src/index.ts");
  write("packages/react/src/atomic/Slider/src/Slider.tsx");
  write("packages/react/src/atomic/Slider/src/slider.stories.tsx");
  write("packages/react/src/atomic/Slider/src/SliderRange.tsx");
  write("packages/react/src/atomic/Slider/src/sliderRange.stories.tsx");
  write("packages/react/src/atomic/Slider/src/hooks/useSliderDrag.ts");

  return cwd;
}

function baseConfig(cwd: string): SourceMapConfig {
  return {
    repoName: "fixture-repo",
    cwd,
    groups: {
      atomic: "packages/react/src/atomic",
      composite: "packages/react/src/composite",
    },
    commands: BASE_COMMANDS,
    shared: {},
    newComponentReference: "packages/react/src/atomic/Box",
  };
}

describe("generateSourceMap", () => {
  let cwd: string;

  beforeEach(() => {
    cwd = makeFixtureRepo();
    (execSync as jest.Mock).mockReturnValue(
      [
        { name: "@nimbus-ds/box", location: "packages/react/src/atomic/Box" },
        {
          name: "@nimbus-ds/table",
          location: "packages/react/src/composite/Table",
        },
        {
          name: "@nimbus-ds/slider",
          location: "packages/react/src/atomic/Slider",
        },
      ]
        .map((w) => JSON.stringify(w))
        .join("\n")
    );
  });

  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("resolves a plain component with no extras", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const box = doc.components.find((c) => c.name === "Box");

    expect(box).toEqual({
      name: "Box",
      group: "atomic",
      package: "@nimbus-ds/box",
    });
  });

  it("resolves nested subcomponents/contexts, puts an off-convention file in extras", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const table = doc.components.find((c) => c.name === "Table");

    expect(table?.nested).toEqual(["TableRow"]);
    expect(table?.contexts).toEqual(["TableContext"]);
    expect(table?.extras).toEqual(["src/Table.definitions.ts"]);
  });

  it("puts a sibling top-level export and an unrelated directory in extras", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const slider = doc.components.find((c) => c.name === "Slider");

    expect(slider?.extras).toEqual([
      "src/hooks/",
      "src/sliderRange.stories.tsx",
      "src/SliderRange.tsx",
    ]);
  });

  it("throws on a genuine ambiguity instead of picking a file silently", () => {
    const componentDir = path.join(cwd, "packages/react/src/atomic/Box/src");
    // A second spelling (not just a different case — the filesystem under
    // test may be case-insensitive) whose stem still normalizes to "box".
    fs.writeFileSync(path.join(componentDir, "box_.tsx"), "");

    expect(() => generateSourceMap(baseConfig(cwd))).toThrow(
      /Ambiguous implementation/
    );
  });

  it("is byte-for-byte reproducible across two runs on the same tree", () => {
    const first = writeYaml(generateSourceMap(baseConfig(cwd)));
    const second = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(first).toBe(second);
  });

  it("quotes every string, so a boolean/null/number/date-like value stays a string", () => {
    const config = baseConfig(cwd);
    config.repoName = "2026-09-15";

    const yaml = writeYaml(generateSourceMap(config));

    expect(yaml).toContain('name: "2026-09-15"');
  });

  it("quotes scoped package names — @ may not start a plain YAML scalar", () => {
    const yaml = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(yaml).toContain('package: "@nimbus-ds/box"');
    expect(yaml).not.toMatch(/package: @/);
  });

  it("sorts by group then name, never by a concatenation that can collide", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const order = doc.components.map((c) => `${c.group}/${c.name}`);

    expect(order).toEqual([...order].sort());
  });

  it("carries no volatile field (timestamp, generator version, source sha)", () => {
    const yaml = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(yaml).not.toMatch(/\b\d{4}-\d{2}-\d{2}T/); // no ISO timestamp
    expect(yaml.toLowerCase()).not.toMatch(
      /generated[_-]?at|generator[_-]?version|source[_-]?sha/
    );
  });
});
