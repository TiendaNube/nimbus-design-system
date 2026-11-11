import fs from "fs";
import os from "os";
import path from "path";
import { PackageBuilder } from "./PackageBuilder";

describe("PackageBuilder", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pkg-builder-spec-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("extracts package names from a single .yarn/versions manifest", () => {
    const manifestPath = path.join(tempDir, "first.yml");
    fs.writeFileSync(
      manifestPath,
      [
        "releases:",
        '  "@nimbus-ds/components": minor',
        '  "@nimbus-ds/styles": minor',
        "",
      ].join("\n")
    );

    const builder = new PackageBuilder();
    expect(builder.getPackagesToBuild(manifestPath)).toEqual([
      "@nimbus-ds/components",
      "@nimbus-ds/styles",
    ]);
  });

  it("computes the deduplicated union across multiple .yarn/versions/*.yml manifests", () => {
    const first = path.join(tempDir, "a.yml");
    const second = path.join(tempDir, "b.yml");
    fs.writeFileSync(
      first,
      [
        "releases:",
        '  "@nimbus-ds/components": minor',
        '  "@nimbus-ds/button": patch',
        "",
      ].join("\n")
    );
    fs.writeFileSync(
      second,
      [
        "releases:",
        '  "@nimbus-ds/components": minor',
        '  "@nimbus-ds/styles": minor',
        "",
      ].join("\n")
    );

    const builder = new PackageBuilder();
    expect(builder.getPackagesToBuildFromPaths([first, second])).toEqual([
      "@nimbus-ds/components",
      "@nimbus-ds/button",
      "@nimbus-ds/styles",
    ]);
  });
});
