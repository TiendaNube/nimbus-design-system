import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { generateNextIndex } from "./generate-next-index";
import { compileAdminTheme } from "./compile-admin-theme";

const rootDir = path.resolve(__dirname, "..");
const tokensDir = path.join(rootDir, "packages/core/tokens/src");
const stylesSrcDir = path.join(rootDir, "packages/core/styles/src");
const nextSrcDir = path.join(rootDir, "packages/react/src/next");

const runStep = (label: string, cmd: string): void => {
  const start = Date.now();
  // eslint-disable-next-line no-console
  console.log(`\n⏳ [watch:admin] ${label}...`);
  try {
    execSync(cmd, {
      cwd: rootDir,
      stdio: "inherit",
      env: { ...process.env, NIMBUS_SKIP_DTS: "true" }
    });
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    // eslint-disable-next-line no-console
    console.log(`✅ [watch:admin] ${label} completed in ${elapsed}s`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`❌ [watch:admin] ${label} failed:`, (err as Error).message);
  }
};

// Ensure initial build artifacts exist so Admin can start immediately
generateNextIndex(nextSrcDir);

if (!fs.existsSync(path.join(rootDir, "packages/core/webpack/dist/index.js"))) {
  runStep(
    "Initial @nimbus-ds/webpack build",
    "yarn workspace @nimbus-ds/webpack build"
  );
}

if (
  !fs.existsSync(path.join(rootDir, "packages/core/tokens/dist/js/tokens.js"))
) {
  runStep("Initial @nimbus-ds/tokens build", "yarn build:tokens");
}

if (!fs.existsSync(path.join(rootDir, "packages/core/styles/dist/index.js"))) {
  runStep(
    "Initial @nimbus-ds/styles build",
    "yarn workspace @nimbus-ds/styles build"
  );
}

// eslint-disable-next-line no-console
console.log(
  [
    "",
    "👀 [watch:admin] Watching Nimbus for live Admin iteration:",
    "   • Component .tsx edits (packages/react/src/**) → instant Vite HMR in Admin (no build needed)",
    "   • /next component directories                  → auto-updates packages/react/src/next/index.ts",
    "   • Norte UI theme values                       → direct CSS HMR (no JS rebuild)",
    "   • Other style .css.ts edits                    → rebuild of @nimbus-ds/styles",
    "   • Token .json edits (packages/core/tokens)     → rebuilds @nimbus-ds/tokens + @nimbus-ds/styles (~3s)",
    ""
  ].join("\n")
);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingTokens = false;
let pendingStyles = false;
let pendingNextIndex = false;
let compiling = false;
const pendingThemes = new Set<string>();
const fastThemes = new Set([
  "nimbus-theme-dark.css.ts",
  "nimbus-theme-next.css.ts",
  "nimbus-theme-nextDark.css.ts",
  "nimbus-theme-nextNorteui.css.ts",
  "nimbus-theme-nextNorteuiDark.css.ts"
]);

const flushQueue = async (): Promise<void> => {
  debounceTimer = null;
  if (compiling) return;
  compiling = true;
  try {
    if (pendingNextIndex) {
      pendingNextIndex = false;
      try {
        generateNextIndex(nextSrcDir);
        // eslint-disable-next-line no-console
        console.log(
          "✅ [watch:admin] Updated packages/react/src/next/index.ts"
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(
          "❌ [watch:admin] Failed to update /next index:",
          (err as Error).message
        );
      }
    }

    if (pendingTokens) {
      pendingThemes.clear();
      pendingTokens = false;
      pendingStyles = false;
      runStep(
        "Rebuilding @nimbus-ds/tokens + @nimbus-ds/styles",
        "yarn build:tokens && yarn workspace @nimbus-ds/styles build"
      );
    } else if (pendingStyles) {
      pendingThemes.clear();
      pendingStyles = false;
      runStep(
        "Rebuilding @nimbus-ds/styles",
        "yarn workspace @nimbus-ds/styles build"
      );
    } else {
      const themes = [...pendingThemes];
      pendingThemes.clear();
      let fallbackNeeded = false;
      await themes.reduce(async (previous, filename) => {
        await previous;
        if (fallbackNeeded) return;
        const start = Date.now();
        try {
          await compileAdminTheme(rootDir, filename);
          // eslint-disable-next-line no-console
          console.log(
            `⚡ [watch:admin] ${filename}: CSS updated in ${
              Date.now() - start
            }ms (no JS rebuild)`
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            `⚠️ [watch:admin] Theme fast path unavailable: ${
              (error as Error).message
            }`
          );
          fallbackNeeded = true;
        }
      }, Promise.resolve());
      if (fallbackNeeded) {
        runStep(
          "Rebuilding @nimbus-ds/styles",
          "yarn workspace @nimbus-ds/styles build"
        );
      }
    }
  } finally {
    compiling = false;
    if (
      pendingTokens ||
      pendingStyles ||
      pendingNextIndex ||
      pendingThemes.size
    ) {
      // Schedule work that arrived during the asynchronous theme compilation.
      // eslint-disable-next-line no-use-before-define
      scheduleFlush();
    }
  }
};

function scheduleFlush(): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    flushQueue().catch((error: Error) => {
      // eslint-disable-next-line no-console
      console.error("❌ [watch:admin] Update failed:", error.message);
    });
  }, 50);
}

if (fs.existsSync(tokensDir)) {
  fs.watch(tokensDir, { recursive: true }, (_event, filename) => {
    if (!filename || !filename.endsWith(".json")) return;
    pendingTokens = true;
    scheduleFlush();
  });
}

if (fs.existsSync(stylesSrcDir)) {
  fs.watch(stylesSrcDir, { recursive: true }, (_event, filename) => {
    if (
      !filename ||
      (!filename.endsWith(".ts") &&
        !filename.endsWith(".css") &&
        !filename.endsWith(".json"))
    )
      return;
    const themeFile = path.basename(filename);
    if (filename.endsWith(".json") && path.dirname(filename) === "themes") {
      pendingThemes.add("nimbus-theme-nextNorteui.css.ts");
      pendingThemes.add("nimbus-theme-nextNorteuiDark.css.ts");
    } else if (
      fastThemes.has(themeFile) &&
      path.dirname(filename) === "themes"
    ) {
      pendingThemes.add(themeFile);
    } else {
      pendingStyles = true;
    }
    scheduleFlush();
  });
}

if (fs.existsSync(nextSrcDir)) {
  fs.watch(nextSrcDir, { recursive: true }, (_event, filename) => {
    if (!filename || filename === "index.ts") return;
    pendingNextIndex = true;
    scheduleFlush();
  });
}
