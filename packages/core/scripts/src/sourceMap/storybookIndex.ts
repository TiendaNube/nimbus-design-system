import fs from "fs";

interface StorybookIndexEntry {
  id: string;
  type?: string;
  importPath?: string;
}

/**
 * Checks whether an unknown Storybook index value has the required shape.
 */
function isStorybookIndexEntry(value: unknown): value is StorybookIndexEntry {
  if (typeof value !== "object" || value === null || !("id" in value)) {
    return false;
  }

  return typeof Reflect.get(value, "id") === "string";
}

/**
 * Loads Storybook entry IDs grouped by their originating stories files.
 */
export function loadStoryIndex(indexPath: string): Map<string, string> {
  const result = new Map<string, string>();

  let raw: unknown;

  try {
    raw = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  } catch {
    return result;
  }

  if (typeof raw !== "object" || raw === null || !("entries" in raw)) {
    return result;
  }

  const entries = Reflect.get(raw, "entries");

  if (typeof entries !== "object" || entries === null) {
    return result;
  }

  const byStoriesFile = new Map<
    string,
    {
      docsId?: string;
      storyId?: string;
    }
  >();

  for (const entry of Object.values(entries)) {
    if (!isStorybookIndexEntry(entry) || typeof entry.importPath !== "string") {
      continue;
    }

    const storiesFile = entry.importPath.replace(/^\.\//, "");

    const existing = byStoriesFile.get(storiesFile) ?? {};

    if (entry.type === "docs" && !existing.docsId) {
      existing.docsId = entry.id;
    }

    if (entry.type === "story" && !existing.storyId) {
      existing.storyId = entry.id;
    }

    byStoriesFile.set(storiesFile, existing);
  }

  for (const [storiesFile, ids] of byStoriesFile) {
    const chosen = ids.docsId ?? ids.storyId;

    if (chosen) {
      result.set(storiesFile, chosen);
    }
  }

  return result;
}
