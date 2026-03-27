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

const WIP_SECTION_START = "## Work in Progress";
const WIP_SECTION_PLACEHOLDER = `${WIP_SECTION_START}

<!-- Edit this section manually. It will NOT be overwritten by yarn document:changes -->

| Who | Component | Status | Notes |
|-----|-----------|--------|-------|
| | | | |
`;

// Properties considered "sizing" — shown with actual before→after values
const SIZING_PROPERTIES = new Set([
  "height", "width", "minHeight", "maxHeight", "minWidth", "maxWidth",
  "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight",
  "margin", "marginTop", "marginBottom", "marginLeft", "marginRight",
  "fontSize", "lineHeight", "borderRadius", "gap", "borderWidth",
]);

// Variant keys to ignore when detecting added/removed styleVariants entries
const EXCLUDED_VARIANT_KEYS = new Set([
  "vars", "selectors", "defaultVariants", "compoundVariants",
  "base", "display", "alignItems", "justifyContent",
]);

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
  /** Short items for the per-file table column */
  summary: string[];
  /** Richer bullets for the per-component narrative section */
  bullets: string[];
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

function getFileFullDiff(filePath: string): string {
  try {
    return execSync(`git diff ${BASE_REF} -- ${filePath}`, {
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
// Component name extractor
// ---------------------------------------------------------------------------

/**
 * Infers a PascalCase component name from a relative file path.
 *
 * Examples:
 *   "Button/src/button.types.ts"           → "Button"
 *   "atomic/button/nimbus-button.css.ts"   → "Button"
 *   "composite/ProductCard/src/index.tsx"  → "ProductCard"
 */
function extractComponentName(filePath: string): string {
  const segments = filePath.split("/");

  const rawName =
    segments[0] === "atomic" || segments[0] === "composite"
      ? (segments[1] ?? "unknown")
      : segments[0];

  // Convert kebab-case to PascalCase: "product-card" → "ProductCard"
  return rawName
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// ---------------------------------------------------------------------------
// Change summary extractors — TABLE column (short)
// ---------------------------------------------------------------------------

/**
 * Extracts added/removed/modified story names from a .stories.tsx diff.
 * Detects new exports and modifications within existing stories.
 */
function extractStoriesSummary(diff: string): string[] {
  const lines = diff.split("\n");
  const added: string[] = [];
  const removed: string[] = [];
  const modified: string[] = [];

  let currentStory = "";
  let hunkHasAdditions = false;
  let hunkHasRemovals = false;

  const flushStory = (): void => {
    if (!currentStory || added.includes(currentStory) || removed.includes(currentStory)) return;
    if (hunkHasAdditions && hunkHasRemovals && !modified.includes(currentStory)) {
      modified.push(currentStory);
    }
  };

  for (const line of lines) {
    const addExportMatch = /^\+.*export const (\w+)/.exec(line);
    if (addExportMatch) {
      added.push(addExportMatch[1]);
      currentStory = addExportMatch[1];
      hunkHasAdditions = false;
      hunkHasRemovals = false;
      continue;
    }

    const removeExportMatch = /^-.*export const (\w+)/.exec(line);
    if (removeExportMatch) {
      removed.push(removeExportMatch[1]);
      continue;
    }

    const hunkMatch = /^@@.*@@.*export const (\w+)/.exec(line);
    if (hunkMatch) {
      flushStory();
      currentStory = hunkMatch[1];
      hunkHasAdditions = false;
      hunkHasRemovals = false;
      continue;
    }

    const contextExportMatch = /^ .*export const (\w+)/.exec(line);
    if (contextExportMatch) {
      flushStory();
      currentStory = contextExportMatch[1];
      hunkHasAdditions = false;
      hunkHasRemovals = false;
      continue;
    }

    if (line.startsWith("+") && !line.startsWith("+++")) hunkHasAdditions = true;
    if (line.startsWith("-") && !line.startsWith("---")) hunkHasRemovals = true;
  }

  flushStory();

  const summary: string[] = [];
  if (added.length > 0) summary.push(`Added stories: \`${added.join("`, `")}\``);
  if (removed.length > 0) summary.push(`Removed stories: \`${removed.join("`, `")}\``);
  if (modified.length > 0) summary.push(`Updated stories: \`${modified.join("`, `")}\``);

  return summary;
}

/**
 * Extracts added/removed members from a .types.ts diff.
 * Handles interface properties (propName?: Type) and union type values (| "value").
 */
function extractTypesSummary(diff: string): string[] {
  const lines = diff.split("\n");
  const addedMembers: string[] = [];
  const removedMembers: string[] = [];
  const addedUnion: Record<string, string[]> = {};
  const removedUnion: Record<string, string[]> = {};

  let currentProp = "";

  for (const line of lines) {
    const contextPropMatch = /^[ ]\s{1,}(\w+\??)\s*:?\s*$/.exec(line);
    if (contextPropMatch) {
      currentProp = contextPropMatch[1].replace(/\?$/, "");
    }

    const addedUnionMatch = /^\+\s+\|\s+"([^"]+)"/.exec(line);
    if (addedUnionMatch) {
      const key = currentProp || "type";
      if (!addedUnion[key]) addedUnion[key] = [];
      addedUnion[key].push(addedUnionMatch[1]);
      continue;
    }

    const removedUnionMatch = /^-\s+\|\s+"([^"]+)"/.exec(line);
    if (removedUnionMatch) {
      const key = currentProp || "type";
      if (!removedUnion[key]) removedUnion[key] = [];
      removedUnion[key].push(removedUnionMatch[1]);
      continue;
    }

    const addedMemberMatch = /^\+\s{2,}(\w+\??:\s*.+?)(?:;|,)?$/.exec(line);
    if (addedMemberMatch && !addedMemberMatch[1].startsWith("//")) {
      addedMembers.push(addedMemberMatch[1].trim().replace(/[;,]$/, ""));
    }

    const removedMemberMatch = /^-\s{2,}(\w+\??:\s*.+?)(?:;|,)?$/.exec(line);
    if (removedMemberMatch && !removedMemberMatch[1].startsWith("//")) {
      removedMembers.push(removedMemberMatch[1].trim().replace(/[;,]$/, ""));
    }
  }

  const summary: string[] = [];
  const MAX_DISPLAY = 4;

  for (const [prop, values] of Object.entries(addedUnion)) {
    summary.push(`Added to \`${prop}\`: \`"${values.join('", "')}"\``);
  }
  for (const [prop, values] of Object.entries(removedUnion)) {
    summary.push(`Removed from \`${prop}\`: \`"${values.join('", "')}"\``);
  }

  if (addedMembers.length > 0) {
    const shown = addedMembers.slice(0, MAX_DISPLAY);
    const extra = addedMembers.length - MAX_DISPLAY;
    const label = extra > 0 ? `\`${shown.join("`, `")}\` (+${extra} more)` : `\`${shown.join("`, `")}\``;
    summary.push(`Added: ${label}`);
  }
  if (removedMembers.length > 0) {
    const shown = removedMembers.slice(0, MAX_DISPLAY);
    const extra = removedMembers.length - MAX_DISPLAY;
    const label = extra > 0 ? `\`${shown.join("`, `")}\` (+${extra} more)` : `\`${shown.join("`, `")}\``;
    summary.push(`Removed: ${label}`);
  }

  return summary;
}

/**
 * Extracts added/removed variant keys from a vanilla-extract .css.ts diff.
 */
function extractStylesSummary(diff: string): string[] {
  const summary: string[] = [];
  const addedVariants: string[] = [];
  const removedVariants: string[] = [];
  const addedProps: string[] = [];
  const removedProps: string[] = [];

  for (const line of diff.split("\n")) {
    const addVariant = /^\+\s+(\w+):\s*[\[{]/.exec(line);
    const removeVariant = /^-\s+(\w+):\s*[\[{]/.exec(line);
    if (addVariant && !EXCLUDED_VARIANT_KEYS.has(addVariant[1])) {
      addedVariants.push(addVariant[1]);
    }
    if (removeVariant && !EXCLUDED_VARIANT_KEYS.has(removeVariant[1])) {
      removedVariants.push(removeVariant[1]);
    }

    const addProp = /^\+\s+(\w[\w-]+):\s+"[^"]*"/.exec(line);
    const removeProp = /^-\s+(\w[\w-]+):\s+"[^"]*"/.exec(line);
    if (addProp) addedProps.push(addProp[1]);
    if (removeProp) removedProps.push(removeProp[1]);

    const addQuotedProp = /^\+\s+"([\w-]+)":\s/.exec(line);
    const removeQuotedProp = /^-\s+"([\w-]+)":\s/.exec(line);
    if (addQuotedProp) addedProps.push(addQuotedProp[1]);
    if (removeQuotedProp) removedProps.push(removeQuotedProp[1]);
  }

  const uniqueAddedVariants = [...new Set(addedVariants)];
  const uniqueRemovedVariants = [...new Set(removedVariants)];
  const uniqueAddedProps = [...new Set(addedProps)].slice(0, 5);
  const uniqueRemovedProps = [...new Set(removedProps)].slice(0, 5);

  if (uniqueAddedVariants.length > 0) {
    summary.push(`Added variants: \`${uniqueAddedVariants.join("`, `")}\``);
  }
  if (uniqueRemovedVariants.length > 0) {
    summary.push(`Removed variants: \`${uniqueRemovedVariants.join("`, `")}\``);
  }
  if (uniqueAddedProps.length > 0) {
    summary.push(`Updated styles: \`${uniqueAddedProps.join("`, `")}\``);
  }
  if (uniqueRemovedProps.length > 0 && uniqueRemovedVariants.length === 0) {
    summary.push(`Removed styles: \`${uniqueRemovedProps.join("`, `")}\``);
  }

  return summary;
}

// ---------------------------------------------------------------------------
// Change BULLET extractors — Component Changes section (rich)
// ---------------------------------------------------------------------------

/**
 * Produces rich narrative bullets for a vanilla-extract .css.ts diff.
 *
 * Detects:
 * - CSS sizing value changes with variant context (height, padding, etc.)
 * - Token reference changes (varsThemeBase.colors.X.Y → varsThemeBase.colors.A.B)
 * - New styleVariants keys added (new appearances, sizes)
 * - Structural selector migration (:hover → &:not(:disabled):hover)
 * - Added color/style properties (keys with quoted names)
 */
function extractStylesBullets(diff: string): string[] {
  const lines = diff.split("\n");
  const bullets: string[] = [];

  let currentVariantKey = "";

  // Pending removed CSS string values (sized properties like height, padding)
  const pendingSizingRemovals = new Map<string, Array<{ value: string; variant: string }>>();

  // Pending removed token references (varsThemeBase.colors.X.Y)
  const pendingTokenRemovals = new Map<string, Array<{ token: string; variant: string }>>();

  interface SizingChange { property: string; before: string; after: string; variant: string }
  interface TokenRefChange { property: string; before: string; after: string; variant: string }

  const sizingChanges: SizingChange[] = [];
  const tokenRefChanges: TokenRefChange[] = [];
  const newVariantKeys: string[] = [];
  const addedColorKeys: string[] = [];
  let hasSelectorsChange = false;

  for (const line of lines) {
    // Track variant key from context lines (e.g. "   small: {")
    const ctxVariantMatch = /^[ ]\s{2,4}(\w+): [\[{]/.exec(line);
    if (ctxVariantMatch && !EXCLUDED_VARIANT_KEYS.has(ctxVariantMatch[1])) {
      currentVariantKey = ctxVariantMatch[1];
    }

    // Reset variant context at new hunk; re-read from hunk header if available
    if (/^@@/.test(line)) {
      currentVariantKey = "";
      const hunkVariantMatch = /^@@.*@@.*\s(\w+): [\[{]/.exec(line);
      if (hunkVariantMatch && !EXCLUDED_VARIANT_KEYS.has(hunkVariantMatch[1])) {
        currentVariantKey = hunkVariantMatch[1];
      }
    }

    // New variant key added: +  success: [ or +  success: {
    const addedKeyMatch = /^\+\s{2,4}(\w+): [\[{]/.exec(line);
    if (addedKeyMatch && !EXCLUDED_VARIANT_KEYS.has(addedKeyMatch[1])) {
      newVariantKeys.push(addedKeyMatch[1]);
      currentVariantKey = addedKeyMatch[1];
    }

    // Structural: old ":hover" / ":active" / ":focus" pseudo-class syntax
    if (/^-\s+":(?:hover|active|focus)":/.test(line)) {
      hasSelectorsChange = true;
    }

    // Added quoted property key (color map entry): +  "ai-generativeTextHigh": ...
    const addedColorKey = /^\+\s+"([\w-]+)":\s/.exec(line);
    if (addedColorKey) addedColorKeys.push(addedColorKey[1]);

    // --- CSS string value changes (quoted, e.g. height: "2rem") ---

    const removedValMatch = /^-\s+(\w[\w-]*): "([^"]+)"/.exec(line);
    if (removedValMatch) {
      const [, prop, val] = removedValMatch;
      if (SIZING_PROPERTIES.has(prop)) {
        if (!pendingSizingRemovals.has(prop)) pendingSizingRemovals.set(prop, []);
        pendingSizingRemovals.get(prop)!.push({ value: val, variant: currentVariantKey });
      }
    }

    const addedValMatch = /^\+\s+(\w[\w-]*): "([^"]+)"/.exec(line);
    if (addedValMatch) {
      const [, prop, val] = addedValMatch;
      if (SIZING_PROPERTIES.has(prop)) {
        const pending = pendingSizingRemovals.get(prop);
        if (pending && pending.length > 0) {
          const removed = pending.shift()!;
          if (removed.value !== val) {
            sizingChanges.push({ property: prop, before: removed.value, after: val, variant: removed.variant || currentVariantKey });
          }
          if (pending.length === 0) pendingSizingRemovals.delete(prop);
        }
      }
    }

    // --- Token reference changes (varsThemeBase.colors.Group.token) ---

    // Match: -  propName: varsThemeBase.colors.Group.tokenName,
    // Key by "prop::variant" to avoid false pairings across different variant contexts
    const removedTokenMatch = /^-\s+(\w[\w-]*):\s+varsThemeBase\.colors\.(\w+)\.(\w+)/.exec(line);
    if (removedTokenMatch) {
      const [, prop, group, token] = removedTokenMatch;
      const key = `${prop}::${currentVariantKey}`;
      if (!pendingTokenRemovals.has(key)) pendingTokenRemovals.set(key, []);
      pendingTokenRemovals.get(key)!.push({ token: `${group}.${token}`, variant: currentVariantKey });
    }

    // Match: +  propName: varsThemeBase.colors.Group.tokenName,
    const addedTokenMatch = /^\+\s+(\w[\w-]*):\s+varsThemeBase\.colors\.(\w+)\.(\w+)/.exec(line);
    if (addedTokenMatch) {
      const [, prop, group, token] = addedTokenMatch;
      const newToken = `${group}.${token}`;
      const key = `${prop}::${currentVariantKey}`;
      const pending = pendingTokenRemovals.get(key);
      if (pending && pending.length > 0) {
        const removed = pending.shift()!;
        if (removed.token !== newToken) {
          tokenRefChanges.push({ property: prop, before: removed.token, after: newToken, variant: currentVariantKey });
        }
        if (pending.length === 0) pendingTokenRemovals.delete(key);
      } else {
        // No previous value tracked — treat as a newly set token
        tokenRefChanges.push({ property: prop, before: "", after: newToken, variant: currentVariantKey });
      }
    }
  }

  // --- Format: sizing changes grouped by property ---
  const sizingByProp = new Map<string, SizingChange[]>();
  for (const c of sizingChanges) {
    if (!sizingByProp.has(c.property)) sizingByProp.set(c.property, []);
    sizingByProp.get(c.property)!.push(c);
  }
  for (const [prop, changes] of sizingByProp) {
    const parts = changes.map((c) => {
      const label = c.variant ? `\`${c.variant}\` ` : "";
      return `${label}\`${c.before} → ${c.after}\``;
    });
    bullets.push(`\`${prop}\` changed: ${parts.join(", ")}`);
  }

  // --- Format: token reference changes ---
  // Group by property; separate "paired changes" (before → after) from "additions" (set to).
  // Filter out additions that belong to newly added variants (already covered by "Added variants").
  const newVariantKeySet = new Set(newVariantKeys);
  const tokenByProp = new Map<string, TokenRefChange[]>();
  for (const c of tokenRefChanges) {
    // Skip "set to" entries for brand-new variants — they're noise
    if (c.before === "" && newVariantKeySet.has(c.variant)) continue;
    if (!tokenByProp.has(c.property)) tokenByProp.set(c.property, []);
    tokenByProp.get(c.property)!.push(c);
  }

  const MAX_INDIVIDUAL_TOKEN_CHANGES = 4;

  for (const [prop, allChanges] of tokenByProp) {
    const paired = allChanges.filter(c => c.before !== "");
    const additions = allChanges.filter(c => c.before === "");

    // When the variant context wasn't tracked (variant === ""), infer it from the token group
    const resolveVariant = (c: TokenRefChange): string =>
      c.variant || c.before.split(".")[0] || c.after.split(".")[0];

    // Try to group paired changes by token-suffix pattern (e.g. *.surface → *.surfaceDisabled)
    if (paired.length > 1) {
      const beforeSuffixes = [...new Set(paired.map(c => c.before.split(".").pop()!))];
      const afterSuffixes = [...new Set(paired.map(c => c.after.split(".").pop()!))];

      if (beforeSuffixes.length === 1 && afterSuffixes.length === 1) {
        // Uniform suffix change across multiple variants
        const variants = [...new Set(paired.map(resolveVariant).filter(Boolean))];
        const scope = variants.length > 0 ? ` in \`${variants.join("`, `")}\`` : "";
        bullets.push(`\`${prop}\` token updated${scope}: \`*.${beforeSuffixes[0]} → *.${afterSuffixes[0]}\``);
      } else if (paired.length > MAX_INDIVIDUAL_TOKEN_CHANGES) {
        // Too many diverse changes — summarize
        const affectedVariants = [...new Set(paired.map(resolveVariant).filter(Boolean))];
        const scope = affectedVariants.length > 0 ? ` across \`${affectedVariants.join("`, `")}\`` : "";
        bullets.push(`\`${prop}\` token references updated${scope}`);
      } else {
        for (const c of paired) {
          const variantLabel = resolveVariant(c);
          const variantPrefix = variantLabel ? `\`${variantLabel}\` ` : "";
          bullets.push(`${variantPrefix}\`${prop}\`: \`${c.before} → ${c.after}\``);
        }
      }
    } else if (paired.length === 1) {
      const c = paired[0];
      const variantLabel = resolveVariant(c);
      const variantPrefix = variantLabel ? `\`${variantLabel}\` ` : "";
      bullets.push(`${variantPrefix}\`${prop}\`: \`${c.before} → ${c.after}\``);
    }

    // Additions not in new variants
    for (const c of additions) {
      const variantLabel = resolveVariant(c);
      const variantPrefix = variantLabel ? `\`${variantLabel}\` ` : "";
      bullets.push(`${variantPrefix}\`${prop}\` set to \`${c.after}\``);
    }
  }

  // --- New variant keys ---
  const uniqueNewKeys = [...new Set(newVariantKeys)];
  if (uniqueNewKeys.length > 0) {
    bullets.push(`Added variants: \`${uniqueNewKeys.join("`, `")}\``);
  }

  // --- Structural selector change ---
  if (hasSelectorsChange) {
    bullets.push("Interactive states scoped with `:not(:disabled)` selector");
  }

  // --- Added color/style keys ---
  const uniqueColorKeys = [...new Set(addedColorKeys)];
  if (uniqueColorKeys.length > 0) {
    bullets.push(`Added color entries: \`${uniqueColorKeys.join("`, `")}\``);
  }

  return bullets;
}

/**
 * Produces rich narrative bullets for a .types.ts diff.
 * Reuses the same logic as the table summary since it already produces clear output.
 */
function extractTypesBullets(diff: string): string[] {
  // The summary extractor already produces good narrative bullets for types.
  return extractTypesSummary(diff);
}

/**
 * Produces rich narrative bullets for a .stories.tsx diff.
 * Extends the table summary with JSX prop value change detection for modified stories.
 */
function extractStoriesBullets(diff: string): string[] {
  const lines = diff.split("\n");
  const bullets: string[] = [...extractStoriesSummary(diff)];

  // Detect JSX prop value changes within modified stories.
  // Track current story from hunk header or context lines.
  let currentStory = "";
  const removedJsxProps = new Map<string, string>(); // propName → oldValue
  const propChanges: Array<{ story: string; prop: string; before: string; after: string }> = [];

  for (const line of lines) {
    // Track story context from hunk header or context export
    const hunkStory = /^@@.*@@.*export const (\w+)/.exec(line);
    if (hunkStory) {
      currentStory = hunkStory[1];
      removedJsxProps.clear();
      continue;
    }
    const ctxStory = /^[ ].*export const (\w+)/.exec(line);
    if (ctxStory) {
      currentStory = ctxStory[1];
      removedJsxProps.clear();
      continue;
    }

    // Collect removed JSX prop values: propName="oldValue" on a removed line
    if (line.startsWith("-") && !line.startsWith("---")) {
      const jsxPropRe = /\b(\w+)="([^"]+)"/g;
      let m: RegExpExecArray | null;
      while ((m = jsxPropRe.exec(line)) !== null) {
        removedJsxProps.set(m[1], m[2]);
      }
    }

    // Match added JSX prop values against pending removed ones
    if (line.startsWith("+") && !line.startsWith("+++")) {
      const jsxPropRe = /\b(\w+)="([^"]+)"/g;
      let m: RegExpExecArray | null;
      while ((m = jsxPropRe.exec(line)) !== null) {
        const [, prop, newVal] = m;
        const oldVal = removedJsxProps.get(prop);
        if (oldVal !== undefined && oldVal !== newVal) {
          propChanges.push({ story: currentStory, prop, before: oldVal, after: newVal });
          removedJsxProps.delete(prop);
        }
      }
    }
  }

  // Group prop changes by story
  const byStory = new Map<string, typeof propChanges>();
  for (const change of propChanges) {
    if (!byStory.has(change.story)) byStory.set(change.story, []);
    byStory.get(change.story)!.push(change);
  }

  for (const [story, changes] of byStory) {
    const parts = changes.map((c) => `\`${c.prop}\`: \`"${c.before}" → "${c.after}"\``);
    bullets.push(`In \`${story}\`: ${parts.join(", ")}`);
  }

  return bullets;
}

/**
 * Dispatches to the appropriate rich bullet extractor based on file extension.
 */
function extractChangeBullets(file: string, diff: string): string[] {
  if (diff.trim().length === 0) return [];

  if (file.endsWith(".stories.tsx") || file.endsWith(".stories.ts")) {
    return extractStoriesBullets(diff);
  }
  if (file.endsWith(".types.ts")) {
    return extractTypesBullets(diff);
  }
  if (file.endsWith(".css.ts")) {
    return extractStylesBullets(diff);
  }

  return [];
}

// ---------------------------------------------------------------------------
// Table summary dispatcher (short, for per-file table column)
// ---------------------------------------------------------------------------

/**
 * Dispatches to the appropriate short summary extractor based on file extension.
 */
function extractChangeSummary(file: string, diff: string): string[] {
  if (diff.trim().length === 0) return [];

  if (file.endsWith(".stories.tsx") || file.endsWith(".stories.ts")) {
    return extractStoriesSummary(diff);
  }
  if (file.endsWith(".types.ts")) {
    return extractTypesSummary(diff);
  }
  if (file.endsWith(".css.ts")) {
    return extractStylesSummary(diff);
  }

  const meaningful = diff
    .split("\n")
    .filter((l) => /^\+(?!\+\+)/.test(l) && l.trim().length > 2)
    .map((l) => l.slice(1).trim())
    .filter((l) => !l.startsWith("//") && !l.startsWith("*"))
    .slice(0, 3);

  return meaningful.length > 0 ? [`\`${meaningful.join("` · `")}\``] : [];
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
      const relativeFile = file.replace(stripPrefix, "");
      const diff = getFileFullDiff(file);
      const summary = extractChangeSummary(relativeFile, diff);
      const bullets = extractChangeBullets(relativeFile, diff);
      return {
        file: relativeFile,
        added: parseInt(added, 10) || 0,
        removed: parseInt(removed, 10) || 0,
        summary,
        bullets,
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

  const hasSummary = files.some((f) => f.summary.length > 0);

  if (hasSummary) {
    const rows = files
      .map((f) => {
        const diff = `+${f.added} / -${f.removed}`;
        const summary = f.summary.length > 0 ? f.summary.join("<br>") : "_—_";
        return `| \`${f.file}\` | ${diff} | ${summary} |`;
      })
      .join("\n");
    return `| File | +/- | What changed |\n|------|-----|-------------|\n${rows}\n`;
  }

  const rows = files
    .map((f) => `| \`${f.file}\` | +${f.added} | -${f.removed} |`)
    .join("\n");
  return `| File | Added | Removed |\n|------|-------|--------|\n${rows}\n`;
}

/**
 * Builds the "### Component Changes" section by grouping all FileChange objects
 * by component name and combining their narrative bullets.
 */
function buildComponentChangesSection(
  styleChanges: FileChange[],
  atomicChanges: FileChange[],
  compositeChanges: FileChange[]
): string {
  const componentMap = new Map<string, string[]>();

  const collectBullets = (changes: FileChange[]): void => {
    for (const change of changes) {
      if (change.bullets.length === 0) continue;
      const name = extractComponentName(change.file);
      if (!componentMap.has(name)) componentMap.set(name, []);
      for (const bullet of change.bullets) {
        const existing = componentMap.get(name)!;
        // Deduplicate bullets across files of the same component
        if (!existing.includes(bullet)) {
          existing.push(bullet);
        }
      }
    }
  };

  collectBullets(styleChanges);
  collectBullets(atomicChanges);
  collectBullets(compositeChanges);

  if (componentMap.size === 0) return "_No component changes_\n";

  return [...componentMap.entries()]
    .map(([name, bullets]) => `**${name}**\n${bullets.map((b) => `- ${b}`).join("\n")}`)
    .join("\n\n") + "\n";
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

  // Component Changes section first — most human-readable at a glance
  if (hasComponentStyles || hasAtomic || hasComposite) {
    const componentSection = buildComponentChangesSection(
      report.componentStyleChanges,
      report.atomicComponentChanges,
      report.compositeComponentChanges
    );
    if (componentSection !== "_No component changes_\n") {
      sections.push(`### Component Changes\n\n${componentSection}`);
    }
  }

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
// WIP section helpers
// ---------------------------------------------------------------------------

/**
 * Extracts the Work in Progress section content from the existing file,
 * or returns the default placeholder if not present.
 */
function extractWipSection(existingContent: string): string {
  const wipStart = existingContent.indexOf(`\n${WIP_SECTION_START}`);
  if (wipStart === -1) return WIP_SECTION_PLACEHOLDER;

  const afterWip = existingContent.indexOf("\n## ", wipStart + 1);
  if (afterWip === -1) return existingContent.slice(wipStart + 1).trimEnd() + "\n";

  // Strip all trailing "---" separators so the script's own separator is the only one
  return existingContent.slice(wipStart + 1, afterWip + 1).replace(/\n+(?:---\s*\n*)+$/, "\n");
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

  const header = "# Design Changes Log\n\n> Auto-generated by `yarn document:changes`. Do NOT edit manually (except the Work in Progress section).\n> Run `yarn document:changes [base-ref]` to append new entries.\n\n";

  let wipSection = WIP_SECTION_PLACEHOLDER;
  let existingEntries = "";

  if (fs.existsSync(OUTPUT_FILE)) {
    const existing = fs.readFileSync(OUTPUT_FILE, "utf8");
    wipSection = extractWipSection(existing);

    const firstEntry = existing.indexOf("\n## ");
    if (firstEntry !== -1) {
      const body = existing.slice(firstEntry + 1);
      const wipInBody = body.indexOf(`${WIP_SECTION_START}`);
      const rawEntries = wipInBody !== -1
        ? body.slice(0, wipInBody) + body.slice(body.indexOf("\n## ", wipInBody + 1) + 1)
        : body;

      // Split into individual entry blocks and remove duplicates of the current entry
      const entryBlocks = rawEntries.split(/(?=^## )/m).filter(Boolean);
      const newEntryHeader = entry.match(/^## .+/m)?.[0] ?? "";
      const deduped = entryBlocks.filter(block => {
        const blockHeader = block.match(/^## .+/m)?.[0] ?? "";
        return blockHeader !== newEntryHeader;
      });
      existingEntries = deduped.join("").trimStart();
    }
  }

  const content = header + wipSection + "\n---\n\n" + entry + (existingEntries ? existingEntries : "");

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
