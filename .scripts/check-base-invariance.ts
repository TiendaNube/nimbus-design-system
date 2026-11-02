import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = path.resolve(__dirname, "..");

interface TokenLeafMap {
  [leafPath: string]: string;
}

const flattenTokenLeaves = (
  node: Record<string, any>,
  prefix = "",
  out: TokenLeafMap = {}
): TokenLeafMap => {
  for (const [key, val] of Object.entries(node)) {
    const nextPath = prefix ? `${prefix}.${key}` : key;
    if (
      val !== null &&
      typeof val === "object" &&
      "value" in val &&
      (typeof val.value === "string" || typeof val.value === "number")
    ) {
      out[nextPath] = String(val.value);
    } else if (val !== null && typeof val === "object") {
      flattenTokenLeaves(val, nextPath, out);
    }
  }
  return out;
};

const parseCssVariables = (cssContent: string): Record<string, string> => {
  const varsMap: Record<string, string> = {};
  const declRegex = /(--[A-Za-z0-9_-]+)\s*:\s*([^;\}]+);/g;
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

const readGitFileAtRef = (ref: string, relPath: string): string | null => {
  try {
    return execSync(`git show ${ref}:${relPath}`, {
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

  // 1. Compare base & dark token definitions in packages/core/tokens/dist/js/tokens.js if built
  const tokensDistRel = "packages/core/tokens/dist/js/tokens.js";
  const tokensDistFull = path.join(rootDir, tokensDistRel);
  if (fs.existsSync(tokensDistFull)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
    const currentTokens = require(tokensDistFull).default ?? require(tokensDistFull);
    const baseColorLeaves = flattenTokenLeaves(currentTokens.color?.light ?? {}, "color.light");
    const darkColorLeaves = flattenTokenLeaves(currentTokens.color?.dark ?? {}, "color.dark");
    const shadowLightLeaves = flattenTokenLeaves(currentTokens.shadow?.light ?? {}, "shadow.light");
    const shadowDarkLeaves = flattenTokenLeaves(currentTokens.shadow?.dark ?? {}, "shadow.dark");

    if (Object.keys(baseColorLeaves).length === 0) {
      errors.push("Missing color.light tokens in @nimbus-ds/tokens.");
    }
    if (Object.keys(darkColorLeaves).length === 0) {
      errors.push("Missing color.dark tokens in @nimbus-ds/tokens.");
    }
    if (Object.keys(shadowLightLeaves).length === 0 || Object.keys(shadowDarkLeaves).length === 0) {
      errors.push("Missing shadow.light or shadow.dark tokens in @nimbus-ds/tokens.");
    }
  }

  // 2. Compare globals.css.ts (base :root theme) and nimbus-theme-dark.css.ts against baseRef
  const protectedThemeFiles = [
    "packages/core/styles/src/themes/globals.css.ts",
    "packages/core/styles/src/themes/nimbus-theme-dark.css.ts",
  ];

  for (const relFile of protectedThemeFiles) {
    const baselineContent = readGitFileAtRef(baseRef, relFile);
    const currentPath = path.join(rootDir, relFile);
    if (baselineContent !== null && fs.existsSync(currentPath)) {
      const currentContent = fs.readFileSync(currentPath, "utf8");
      // Extract all existing property key: value assignments from baseline and ensure none were removed or altered
      const assignmentRegex = /^\s*([A-Za-z0-9_"]+)\s*:\s*(.+?),?\s*$/gm;
      let match = assignmentRegex.exec(baselineContent);
      while (match !== null) {
        const key = match[1];
        const rhs = match[2].trim();
        if (! rhs.endsWith("{") && !currentContent.includes(rhs)) {
          errors.push(
            `Base/Dark invariance violation in ${relFile}: baseline assignment for "${key}: ${rhs}" was modified or removed.`
          );
        }
        match = assignmentRegex.exec(baselineContent);
      }
    }
  }

  // 3. If compiled CSS exists in packages/core/styles/dist, validate recursive CSS var resolution
  const baseCssPath = path.join(rootDir, "packages/core/styles/dist/index.css");
  const darkCssPath = path.join(
    rootDir,
    "packages/core/styles/dist/themes/dark.css"
  );
  if (fs.existsSync(baseCssPath)) {
    const baseCss = fs.readFileSync(baseCssPath, "utf8");
    const baseVars = parseCssVariables(baseCss);
    for (const varName of Object.keys(baseVars)) {
      try {
        resolveCssVarValue(varName, baseVars);
      } catch (err: any) {
        errors.push(`CSS variable error in styles/dist/index.css: ${err.message}`);
      }
    }

    if (fs.existsSync(darkCssPath)) {
      const darkCss = fs.readFileSync(darkCssPath, "utf8");
      const darkVars = { ...baseVars, ...parseCssVariables(darkCss) };
      for (const varName of Object.keys(darkVars)) {
        try {
          resolveCssVarValue(varName, darkVars);
        } catch (err: any) {
          errors.push(
            `CSS variable error in styles/dist/themes/dark.css: ${err.message}`
          );
        }
      }
    }
  }

  return errors;
};

const run = () => {
  const args = process.argv.slice(2);
  const baseRefArgIndex = args.indexOf("--base-ref");
  const baseRef =
    baseRefArgIndex !== -1 && args[baseRefArgIndex + 1]
      ? args[baseRefArgIndex + 1]
      : "HEAD";
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
    execSync(
      "yarn jest packages/react/src/__tests__/base-invariance.spec.tsx --no-cache --runInBand",
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
