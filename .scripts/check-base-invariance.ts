import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const rootDir = path.resolve(__dirname, "..");

interface TokenLeafMap {
  [leafPath: string]: string;
}

const isRecord = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === "object" && !Array.isArray(val);

const flattenTokenLeaves = (
  node: Record<string, unknown>,
  prefix = "",
  out: TokenLeafMap = {}
): TokenLeafMap => {
  for (const [key, val] of Object.entries(node)) {
    const nextPath = prefix ? `${prefix}.${key}` : key;
    if (
      isRecord(val) &&
      "value" in val &&
      (typeof val.value === "string" || typeof val.value === "number")
    ) {
      out[nextPath] = String(val.value);
    } else if (isRecord(val)) {
      flattenTokenLeaves(val, nextPath, out);
    }
  }
  return out;
};

const parseCssVariables = (cssContent: string): Record<string, string> => {
  const varsMap: Record<string, string> = {};
  const declRegex = /(--[A-Za-z0-9_-]+)\s*:\s*([^;}]+);/g;
  let match = declRegex.exec(cssContent);
  while (match !== null) {
    varsMap[match[1].trim()] = match[2].trim();
    match = declRegex.exec(cssContent);
  }
  return varsMap;
};

const resolveCssVarValue = (
  varName: string,
  varsMap: Record<string, string>,
  visited = new Set<string>()
): string => {
  if (visited.has(varName)) {
    throw new Error(`Circular CSS variable reference detected at ${varName}`);
  }
  const raw = varsMap[varName];
  if (raw === undefined) {
    throw new Error(`Unresolved CSS variable reference: ${varName}`);
  }
  visited.add(varName);
  return raw.replace(/var\(\s*(--[A-Za-z0-9_-]+)\s*\)/g, (_, refName) =>
    resolveCssVarValue(refName, varsMap, new Set(visited))
  );
};

const resolveDefaultBaseRef = (): string => {
  try {
    execFileSync("git", ["rev-parse", "--verify", "origin/master^{commit}"], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "ignore"],
    });
    return "origin/master";
  } catch {
    return "HEAD";
  }
};

const validateGitRef = (ref: string): string => {
  if (!ref || ref.startsWith("-")) {
    throw new Error(`Invalid git ref argument: "${ref}"`);
  }
  try {
    execFileSync("git", ["rev-parse", "--verify", `${ref}^{commit}`], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "ignore"],
    });
    return ref;
  } catch {
    throw new Error(`Unable to resolve git commit for ref "${ref}"`);
  }
};

const readGitFileAtRef = (ref: string, relPath: string): string | null => {
  try {
    return execFileSync("git", ["show", `${ref}:${relPath}`], {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
};

const verifyTokenAndThemeSourceInvariance = (baseRef: string): string[] => {
  const errors: string[] = [];

  // 1. Verify built tokens (if present) and compare git-tracked token source dictionaries against baseRef
  const tokensDistRel = "packages/core/tokens/dist/js/tokens.js";
  const tokensDistFull = path.join(rootDir, tokensDistRel);
  if (fs.existsSync(tokensDistFull)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
    const loadedTokens = require(tokensDistFull);
    const currentTokens: Record<string, unknown> = isRecord(
      loadedTokens?.default
    )
      ? loadedTokens.default
      : loadedTokens;
    const colorNode = isRecord(currentTokens.color) ? currentTokens.color : {};
    const shadowNode = isRecord(currentTokens.shadow)
      ? currentTokens.shadow
      : {};
    const baseColorLeaves = flattenTokenLeaves(
      isRecord(colorNode.light) ? colorNode.light : {},
      "color.light"
    );
    const darkColorLeaves = flattenTokenLeaves(
      isRecord(colorNode.dark) ? colorNode.dark : {},
      "color.dark"
    );
    const shadowLightLeaves = flattenTokenLeaves(
      isRecord(shadowNode.light) ? shadowNode.light : {},
      "shadow.light"
    );
    const shadowDarkLeaves = flattenTokenLeaves(
      isRecord(shadowNode.dark) ? shadowNode.dark : {},
      "shadow.dark"
    );

    if (Object.keys(baseColorLeaves).length === 0) {
      errors.push("Missing color.light tokens in @nimbus-ds/tokens.");
    }
    if (Object.keys(darkColorLeaves).length === 0) {
      errors.push("Missing color.dark tokens in @nimbus-ds/tokens.");
    }
    if (
      Object.keys(shadowLightLeaves).length === 0 ||
      Object.keys(shadowDarkLeaves).length === 0
    ) {
      errors.push(
        "Missing shadow.light or shadow.dark tokens in @nimbus-ds/tokens."
      );
    }
  }

  const protectedTokenJsonFiles = [
    "packages/core/tokens/src/color/sys.json",
    "packages/core/tokens/src/color/ref.json",
    "packages/core/tokens/src/shadow/sys.json",
    "packages/core/tokens/src/shadow/ref.json",
  ];

  for (const relTokenFile of protectedTokenJsonFiles) {
    const baselineJson = readGitFileAtRef(baseRef, relTokenFile);
    const currentTokenPath = path.join(rootDir, relTokenFile);
    if (baselineJson === null) {
      errors.push(
        `Failed to read baseline token file ${relTokenFile} at ref ${baseRef}.`
      );
      continue;
    }
    if (!fs.existsSync(currentTokenPath)) {
      errors.push(`Missing current token file ${relTokenFile}.`);
      continue;
    }
    const baselineTree = JSON.parse(baselineJson) as Record<string, unknown>;
    const currentTree = JSON.parse(
      fs.readFileSync(currentTokenPath, "utf8")
    ) as Record<string, unknown>;
    const baselineLeaves = flattenTokenLeaves(baselineTree);
    const currentLeaves = flattenTokenLeaves(currentTree);
    for (const [leafKey, baselineVal] of Object.entries(baselineLeaves)) {
      if (
        leafKey.startsWith("color.light.") ||
        leafKey.startsWith("color.dark.") ||
        leafKey.startsWith("shadow.light.") ||
        leafKey.startsWith("shadow.dark.")
      ) {
        if (currentLeaves[leafKey] !== baselineVal) {
          errors.push(
            `Token invariance violation in ${relTokenFile}: "${leafKey}" changed from "${baselineVal}" to "${
              currentLeaves[leafKey] ?? "<removed>"
            }".`
          );
        }
      }
    }
  }

  // 2. Verify all 4 theme files exist and compare globals.css.ts & nimbus-theme-dark.css.ts against baseRef
  const allThemeFiles = [
    "packages/core/styles/src/themes/globals.css.ts",
    "packages/core/styles/src/themes/nimbus-theme-dark.css.ts",
    "packages/core/styles/src/themes/nimbus-theme-next.css.ts",
    "packages/core/styles/src/themes/nimbus-theme-nextDark.css.ts",
  ];
  for (const relTheme of allThemeFiles) {
    if (!fs.existsSync(path.join(rootDir, relTheme))) {
      errors.push(`Missing required theme file: ${relTheme}`);
    }
  }

  const protectedThemeFiles = [
    "packages/core/styles/src/themes/globals.css.ts",
    "packages/core/styles/src/themes/nimbus-theme-dark.css.ts",
  ];
  const normalizeLine = (line: string): string =>
    line.trim().replace(/,$/, "");

  for (const relFile of protectedThemeFiles) {
    const baselineContent = readGitFileAtRef(baseRef, relFile);
    const currentPath = path.join(rootDir, relFile);
    if (baselineContent === null) {
      errors.push(
        `Failed to read baseline theme file ${relFile} at ref ${baseRef}.`
      );
      continue;
    }
    if (!fs.existsSync(currentPath)) {
      errors.push(`Missing protected theme file ${relFile}.`);
      continue;
    }
    const currentContent = fs.readFileSync(currentPath, "utf8");
    const currentNormalizedLines = new Set(
      currentContent.split(/\r?\n/).map(normalizeLine).filter(Boolean)
    );
    const assignmentRegex = /^\s*([A-Za-z0-9_"]+)\s*:\s*(.+?),?\s*$/gm;
    let match = assignmentRegex.exec(baselineContent);
    while (match !== null) {
      const fullLine = normalizeLine(match[0]);
      const rhs = match[2].trim();
      if (!rhs.endsWith("{") && !currentNormalizedLines.has(fullLine)) {
        errors.push(
          `Base/Dark invariance violation in ${relFile}: baseline assignment "${fullLine}" was modified or removed.`
        );
      }
      match = assignmentRegex.exec(baselineContent);
    }
  }

  // 3. If compiled CSS exists in packages/core/styles/dist, validate recursive CSS var resolution
  const baseCssPath = path.join(rootDir, "packages/core/styles/dist/index.css");
  const extraThemeCssPaths = [
    "packages/core/styles/dist/themes/dark.css",
    "packages/core/styles/dist/themes/next.css",
    "packages/core/styles/dist/themes/nextDark.css",
  ];
  if (fs.existsSync(baseCssPath)) {
    const baseCss = fs.readFileSync(baseCssPath, "utf8");
    const baseVars = parseCssVariables(baseCss);
    for (const varName of Object.keys(baseVars)) {
      try {
        resolveCssVarValue(varName, baseVars);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(`CSS variable error in styles/dist/index.css: ${message}`);
      }
    }

    for (const relCssPath of extraThemeCssPaths) {
      const fullCssPath = path.join(rootDir, relCssPath);
      if (fs.existsSync(fullCssPath)) {
        const themeCss = fs.readFileSync(fullCssPath, "utf8");
        const mergedVars = { ...baseVars, ...parseCssVariables(themeCss) };
        for (const varName of Object.keys(mergedVars)) {
          try {
            resolveCssVarValue(varName, mergedVars);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            errors.push(`CSS variable error in ${relCssPath}: ${message}`);
          }
        }
      }
    }
  }

  return errors;
};

const run = () => {
  const args = process.argv.slice(2);
  const baseRefArgIndex = args.indexOf("--base-ref");
  const rawBaseRef =
    baseRefArgIndex !== -1 && args[baseRefArgIndex + 1]
      ? args[baseRefArgIndex + 1]
      : resolveDefaultBaseRef();
  const baseRef = validateGitRef(rawBaseRef);
  const skipJest = args.includes("--skip-jest");

  // eslint-disable-next-line no-console
  console.log(
    `🛡️  Running Base & Dark Invariance Gate (baseline ref: ${baseRef})...`
  );

  // Layer 1: Token & CSS Theme Contract Invariance
  const contractErrors = verifyTokenAndThemeSourceInvariance(baseRef);
  if (contractErrors.length > 0) {
    // eslint-disable-next-line no-console
    console.error("❌ Layer 1 (Token & CSS Theme Invariance) failed:");
    for (const err of contractErrors) {
      // eslint-disable-next-line no-console
      console.error(`   - ${err}`);
    }
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log("✅ Layer 1: Token & CSS Theme contract invariance verified.");

  // Layer 2: Structural & DOM/Attribute Invariance under base and dark in Jest
  if (!skipJest) {
    // eslint-disable-next-line no-console
    console.log(
      "🧪 Layer 2: Running structural DOM & attribute invariance suite (base & dark)..."
    );
    execFileSync(
      "yarn",
      [
        "jest",
        "packages/react/src/__tests__/base-invariance.spec.tsx",
        "--no-cache",
        "--runInBand",
      ],
      {
        cwd: rootDir,
        stdio: "inherit",
      }
    );
    // eslint-disable-next-line no-console
    console.log("✅ Layer 2: Structural DOM & attribute invariance verified.");
  }

  // eslint-disable-next-line no-console
  console.log("🎉 Base & Dark invariance gate passed with 0 regressions.");
};

run();
