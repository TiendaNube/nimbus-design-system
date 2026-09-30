import fs from "fs";
import { generateSourceMap } from "./SourceMap";
import { writeYaml } from "./writeYaml";
import { makeFixtureRepo, baseConfig } from "./testFixtures";

describe("SourceMap", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = makeFixtureRepo();
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });
  it("documents mixed filename casing conventions", () => {
    const doc = generateSourceMap(baseConfig(cwd));

    expect(doc.conventions.implementationNaming).toBe(
      "Implementation keeps the component casing, e.g. Link.tsx"
    );
    expect(doc.conventions.typesNaming).toBe(
      "Types usually use lower camel case, e.g. link.types.ts"
    );
  });
  it("is byte-for-byte reproducible across two runs on the same tree", () => {
    const first = writeYaml(generateSourceMap(baseConfig(cwd)));
    const second = writeYaml(generateSourceMap(baseConfig(cwd)));

    expect(first).toBe(second);
  });
  it("sorts by group then name", () => {
    const doc = generateSourceMap(baseConfig(cwd));
    const order = doc.components.map(
      (component) => `${component.group}/${component.name}`
    );

    expect(order).toEqual([...order].sort());
  });
});
