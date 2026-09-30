import fs from "fs";
import os from "os";
import path from "path";
import { loadStoryIndex } from "./storybookIndex";

describe("Storybook index", () => {
  let cwd: string;
  beforeEach(() => {
    cwd = fs.mkdtempSync(path.join(os.tmpdir(), "source-map-story-"));
  });
  afterEach(() => {
    fs.rmSync(cwd, { recursive: true, force: true });
  });
  it("omits unavailable or malformed index data rather than guessing IDs", () => {
    const file = path.join(cwd, "index.json");
    expect(loadStoryIndex(file).size).toBe(0);
    fs.writeFileSync(file, "invalid");
    expect(loadStoryIndex(file).size).toBe(0);
  });
  it("prefers docs IDs and falls back to story IDs", () => {
    const file = path.join(cwd, "index.json");
    fs.writeFileSync(
      file,
      JSON.stringify({
        entries: {
          first: {
            id: "box-story",
            type: "story",
            importPath: "./Box.stories.tsx",
          },
          docs: {
            id: "box-docs",
            type: "docs",
            importPath: "./Box.stories.tsx",
          },
          other: {
            id: "table-story",
            type: "story",
            importPath: "./Table.stories.tsx",
          },
        },
      })
    );
    expect([...loadStoryIndex(file)]).toEqual([
      ["Box.stories.tsx", "box-docs"],
      ["Table.stories.tsx", "table-story"],
    ]);
  });
});
