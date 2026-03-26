import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const OUTPUT_FILE = path.join(process.cwd(), "DESIGN_CHANGES.md");

const BASE_REF = process.argv[2] ?? "HEAD";

const MONITORED_PATHS = {
  colorRef: "packages/core/tokens/src/color/ref.json",
  colorSys: "packages/core/tokens/src/color/sys.json",
  typographyRef: "packages/core/tokens/src/typography/ref.json",
  typographySys: "packages/core/tokens/src/typography/sys.json",
  shadowRef: "packages/core/tokens/src/shadow/ref.json",
  shadowSys: "packages/core/tokens/src/shadow/sys.json",
  spacingRef: "packages/core/tokens/src/spacing/ref.json",
  componentStyles: "packages/core/styles/src/packages/",
  atomicComponents: "packages/react/src/atomic/",
  compositeComponents: "packages/react/src/composite/",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TokenChange {
  path: string;
  before: string;
  after: string;
}

interface TokenAddition {
  path: string;
  value: string;
}

interface FileChange {
  file: string;
  added: number;
  removed: number;
}

interface ChangeReport {
  date: string;
  baseRef: string;
  colorRefChanges: TokenChange[];
  colorSysChanges: TokenChange[];
  colorSysAdditions: TokenAddition[];
  typographyRefChanges: TokenChange[];
  typographySysChanges: TokenChange[];
  typographySysAdditions: TokenAddition[];
  shadowChanges: TokenChange[];
  spacingChanges: TokenChange[];
  componentStyleChanges: FileChange[];
  atomicComponentChanges: FileChange[];
  compositeComponentChanges: FileChange[];
}

// ---------------------------------------------------------------------------
// Git helpers
// ---------------------------------------------------------------------------

function getOriginalFile(filePath: string): string {
  try {
    return execSync(`git show ${BASE_REF}:${filePath}`, { encoding: "utf8" });
  } catch {
    return "";
  }
}

function fileHasChanges(filePath: string): boolean {
  try {
    const result = execSync(`git diff --name-only ${BASE_REF} -- ${filePath}`, {
      encoding: "utf8",
    });
    return result.trim().length > 0;
  } catch {
    return false;
  }
}

function getFileDiff(dirPath: string): string {
  try {
    return execSync(`git diff ${BASE_REF} --numstat -- ${dirPath}`, {
      encoding: "utf8",
    });
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// JSON token comparator
// ---------------------------------------------------------------------------

function flattenTokens(obj: unknown, prefix = ""): Map<string, string> {
  const map = new Map<string, string>();
  if (typeof obj !== "object" || obj === null) return map;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null && "value" in v) {
      map.set(key, String((v as { value: unknown }).value));
    } else if (typeof v === "object" && v !== null) {
      for (const [subk, subv] of flattenTokens(v, key)) {
        map.set(subk, subv);
      }
    }
  }
  return map;
}

/**
 * Compares a token JSON file against its git base version.
 * Uses `git show` to read the original file content for reliable full-JSON parsing.
 */
function compareTokenFile(filePath: string): {
  changes: TokenChange[];
  additions: TokenAddition[];
} {
  if (!fileHasChanges(filePath)) return { changes: [], additions: [] };

  const originalContent = getOriginalFile(filePath);
  let currentContent = "";
  try {
    currentContent = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
  } catch {
    return { changes: [], additions: [] };
  }

  let beforeObj: unknown = {};
  let afterObj: unknown = {};

  try { beforeObj = JSON.parse(originalContent); } catch { /* no original */ }
  try { afterObj = JSON.parse(currentContent); } catch { /* invalid */ }

  const beforeMap = flattenTokens(beforeObj);
  const afterMap = flattenTokens(afterObj);

  const changes: TokenChange[] = [];
  const additions: TokenAddition[] = [];

  for (const [k, afterVal] of afterMap) {
    if (beforeMap.has(k)) {
      const beforeVal = beforeMap.get(k)!;
      if (beforeVal !== afterVal) {
        changes.push({ path: k, before: beforeVal, after: afterVal });
      }
    } else {
      additions.push({ path: k, value: afterVal });
    }
  }

  return { changes, additions };
}

// ---------------------------------------------------------------------------
// File diff parser
// ---------------------------------------------------------------------------

function parseFileDiff(numstat: string, stripPrefix: string): FileChange[] {
  return numstat
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t");
      if (parts.length < 3) return null;
      const [added, removed, file] = parts;
      return {
        file: file.replace(stripPrefix, ""),
        added: parseInt(added, 10) || 0,
        removed: parseInt(removed, 10) || 0,
      };
    })
    .filter((x): x is FileChange => x !== null);
}

// ---------------------------------------------------------------------------
// Markdown generators
// ---------------------------------------------------------------------------

function tokenChangesTable(changes: TokenChange[]): string {
  if (changes.length === 0) return "_No changes_\n";
  const rows = changes
    .map((c) => `| \`${c.path}\` | ${c.before} | ${c.after} |`)
    .join("\n");
  return `| Token | Before | After |\n|-------|--------|-------|\n${rows}\n`;
}

function tokenAdditionsTable(additions: TokenAddition[]): string {
  if (additions.length === 0) return "_No new tokens_\n";
  const rows = additions.map((a) => `| \`${a.path}\` | ${a.value} |`).join("\n");
  return `| Token | Value |\n|-------|-------|\n${rows}\n`;
}

function fileChangesTable(files: FileChange[]): string {
  if (files.length === 0) return "_No changes_\n";
  const rows = files
    .map((f) => `| \`${f.file}\` | +${f.added} | -${f.removed} |`)
    .join("\n");
  return `| File | Added | Removed |\n|------|-------|--------|\n${rows}\n`;
}

// ---------------------------------------------------------------------------
// Report builder
// ---------------------------------------------------------------------------

function buildReport(report: ChangeReport): string {
  const hasColorRef = report.colorRefChanges.length > 0;
  const hasColorSys = report.colorSysChanges.length > 0 || report.colorSysAdditions.length > 0;
  const hasTypographyRef = report.typographyRefChanges.length > 0;
  const hasTypographySys = report.typographySysChanges.length > 0 || report.typographySysAdditions.length > 0;
  const hasShadow = report.shadowChanges.length > 0;
  const hasSpacing = report.spacingChanges.length > 0;
  const hasComponentStyles = report.componentStyleChanges.length > 0;
  const hasAtomic = report.atomicComponentChanges.length > 0;
  const hasComposite = report.compositeComponentChanges.length > 0;

  const hasAny =
    hasColorRef || hasColorSys || hasTypographyRef || hasTypographySys ||
    hasShadow || hasSpacing || hasComponentStyles || hasAtomic || hasComposite;

  if (!hasAny) {
    return `## ${report.date} — No changes detected (base: \`${report.baseRef}\`)\n\n---\n\n`;
  }

  const sections: string[] = [];

  sections.push(`## ${report.date} — base: \`${report.baseRef}\`\n`);

  if (hasColorRef) {
    sections.push(`### Color tokens — Reference values\n\n${tokenChangesTable(report.colorRefChanges)}`);
  }

  if (hasColorSys) {
    if (report.colorSysChanges.length > 0) {
      sections.push(`### Color tokens — Semantic remapped\n\n${tokenChangesTable(report.colorSysChanges)}`);
    }
    if (report.colorSysAdditions.length > 0) {
      sections.push(`### Color tokens — Semantic new\n\n${tokenAdditionsTable(report.colorSysAdditions)}`);
    }
  }

  if (hasTypographyRef) {
    sections.push(`### Typography tokens — Reference values\n\n${tokenChangesTable(report.typographyRefChanges)}`);
  }

  if (hasTypographySys) {
    if (report.typographySysChanges.length > 0) {
      sections.push(`### Typography tokens — Semantic remapped\n\n${tokenChangesTable(report.typographySysChanges)}`);
    }
    if (report.typographySysAdditions.length > 0) {
      sections.push(`### Typography tokens — Semantic new\n\n${tokenAdditionsTable(report.typographySysAdditions)}`);
    }
  }

  if (hasShadow) {
    sections.push(`### Shadow tokens\n\n${tokenChangesTable(report.shadowChanges)}`);
  }

  if (hasSpacing) {
    sections.push(`### Spacing tokens\n\n${tokenChangesTable(report.spacingChanges)}`);
  }

  if (hasComponentStyles) {
    sections.push(`### Component styles changed\n\n${fileChangesTable(report.componentStyleChanges)}`);
  }

  if (hasAtomic) {
    sections.push(`### Atomic components changed\n\n${fileChangesTable(report.atomicComponentChanges)}`);
  }

  if (hasComposite) {
    sections.push(`### Composite components changed\n\n${fileChangesTable(report.compositeComponentChanges)}`);
  }

  return sections.join("\n") + "\n---\n\n";
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const today = new Date().toISOString().split("T")[0];

  console.log(`\x1b[36m📋 Generating design changes report (base: ${BASE_REF})...\x1b[0m`);

  const { changes: colorRefChanges } = compareTokenFile(MONITORED_PATHS.colorRef);
  const { changes: colorSysChanges, additions: colorSysAdditions } = compareTokenFile(MONITORED_PATHS.colorSys);
  const { changes: typographyRefChanges } = compareTokenFile(MONITORED_PATHS.typographyRef);
  const { changes: typographySysChanges, additions: typographySysAdditions } = compareTokenFile(MONITORED_PATHS.typographySys);
  const { changes: shadowChanges } = compareTokenFile(MONITORED_PATHS.shadowRef);
  const { changes: spacingChanges } = compareTokenFile(MONITORED_PATHS.spacingRef);

  const componentStyleDiff = getFileDiff(MONITORED_PATHS.componentStyles);
  const atomicDiff = getFileDiff(MONITORED_PATHS.atomicComponents);
  const compositeDiff = getFileDiff(MONITORED_PATHS.compositeComponents);

  const report: ChangeReport = {
    date: today,
    baseRef: BASE_REF,
    colorRefChanges,
    colorSysChanges,
    colorSysAdditions,
    typographyRefChanges,
    typographySysChanges,
    typographySysAdditions,
    shadowChanges,
    spacingChanges,
    componentStyleChanges: parseFileDiff(componentStyleDiff, MONITORED_PATHS.componentStyles),
    atomicComponentChanges: parseFileDiff(atomicDiff, MONITORED_PATHS.atomicComponents),
    compositeComponentChanges: parseFileDiff(compositeDiff, MONITORED_PATHS.compositeComponents),
  };

  const entry = buildReport(report);

  const header = "# Design Changes Log\n\n> Auto-generated by `yarn document:changes`. Do NOT edit manually.\n> Run `yarn document:changes [base-ref]` to append new entries.\n\n";

  let content: string;
  if (fs.existsSync(OUTPUT_FILE)) {
    const existing = fs.readFileSync(OUTPUT_FILE, "utf8");
    const bodyStart = existing.indexOf("\n## ");
    const existingBody = bodyStart !== -1 ? existing.slice(bodyStart + 1) : "";
    content = header + entry + existingBody;
  } else {
    content = header + entry;
  }

  fs.writeFileSync(OUTPUT_FILE, content, "utf8");

  const totalChanges =
    colorRefChanges.length +
    colorSysChanges.length +
    colorSysAdditions.length +
    typographyRefChanges.length +
    typographySysChanges.length +
    typographySysAdditions.length +
    shadowChanges.length +
    spacingChanges.length +
    report.componentStyleChanges.length +
    report.atomicComponentChanges.length +
    report.compositeComponentChanges.length;

  if (totalChanges === 0) {
    console.log(`\x1b[33m⚠️  No changes detected vs ${BASE_REF}\x1b[0m`);
  } else {
    console.log(`\x1b[32m✅ ${totalChanges} change(s) documented → DESIGN_CHANGES.md\x1b[0m`);
  }
}

main();
