import fs from "fs";
import path from "path";
import { compareStrings } from "./compareStrings";

/**
 * Normalizes a filesystem path to POSIX separators for deterministic output.
 */
export function toPosix(value: string): string {
  return value.split(path.sep).join("/");
}

/** Returns direct file children of a directory. */
export function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort(compareStrings);
}

/** Returns direct directory children of a directory. */
export function listDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(compareStrings);
}

/**
 * Source directories that do not represent the implementation itself.
 */
const IGNORED_RUNTIME_DIRS = new Set(["demo", "__tests__"]);

/**
 * Recursively lists source files that contribute to the implementation.
 */
export function listRuntimeSourceFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const result: string[] = [];

  for (const entry of fs.readdirSync(dir, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORED_RUNTIME_DIRS.has(entry.name)) {
        result.push(...listRuntimeSourceFiles(fullPath));
      }

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!/\.tsx?$/.test(entry.name)) {
      continue;
    }

    if (/\.(spec|test|stories)\.tsx?$/.test(entry.name)) {
      continue;
    }

    result.push(fullPath);
  }

  return result.sort(compareStrings);
}
