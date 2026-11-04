import fs from "fs";
import os from "os";
import path from "path";

import { execFileSync } from "child_process";

// Vanilla Extract evaluates compiled modules with Node's require. Run it outside
// Jest's module registry so both sides share the same CSS adapter instance.
const compileAdminTheme = async (root: string, file: string): Promise<void> => {
  execFileSync(
    process.execPath,
    [
      "-r",
      "ts-node/register/transpile-only",
      "-e",
      "require(process.argv[1]).compileAdminTheme(process.argv[2], process.argv[3]).catch(error => { console.error(error.message); process.exit(1); })",
      path.join(__dirname, "compile-admin-theme.ts"),
      root,
      file
    ],
    { cwd: path.resolve(__dirname, ".."), stdio: "pipe" }
  );
};

const filename = "nimbus-theme-nextNorteui.css.ts";
const selector = ".nimbus-theme-nextNorteui_variables__existing";
let rootDir: string;
let stylesDir: string;

beforeEach(() => {
  rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-theme-hmr-"));
  stylesDir = path.join(rootDir, "packages/core/styles");
  fs.mkdirSync(path.join(stylesDir, "src/themes"), { recursive: true });
  fs.mkdirSync(path.join(stylesDir, "dist/themes"), { recursive: true });
  fs.symlinkSync(
    path.resolve(__dirname, "../node_modules"),
    path.join(rootDir, "node_modules")
  );
  fs.writeFileSync(
    path.join(stylesDir, "package.json"),
    '{"name":"@nimbus-ds/styles"}'
  );
  fs.writeFileSync(
    path.join(stylesDir, "src/themes", filename),
    `
    import { createTheme, createGlobalThemeContract } from "@vanilla-extract/css";
    const vars = createGlobalThemeContract({ tone: "nimbus-color" });
    export const variables = createTheme(vars, { tone: "#FF0000" });
  `
  );
  ["index.css", "styles.css", "themes/next-norteui.css"].forEach((output) => {
    fs.writeFileSync(
      path.join(stylesDir, "dist", output),
      `:root{--unchanged:blue}${selector}{--nimbus-color:#000000}`
    );
  });
  fs.writeFileSync(
    path.join(stylesDir, "dist/index.js"),
    "existing JavaScript bundle"
  );
});

afterEach(() => fs.rmSync(rootDir, { recursive: true, force: true }));

test("updates theme values while preserving existing selectors, base CSS and JavaScript", async () => {
  await compileAdminTheme(rootDir, filename);
  const css = fs.readFileSync(path.join(stylesDir, "dist/index.css"), "utf8");
  expect(css).toContain(":root{--unchanged:blue}");
  expect(css).toContain(selector);
  expect(css).toContain("--nimbus-color: #FF0000");
  expect(fs.readFileSync(path.join(stylesDir, "dist/index.js"), "utf8")).toBe(
    "existing JavaScript bundle"
  );
});

test("does not write files again when the theme values have not changed", async () => {
  await compileAdminTheme(rootDir, filename);
  const output = path.join(stylesDir, "dist/index.css");
  const before = fs.statSync(output).mtimeMs;
  await compileAdminTheme(rootDir, filename);
  expect(fs.statSync(output).mtimeMs).toBe(before);
});

test("rejects contract changes before writing any CSS output", async () => {
  const output = path.join(stylesDir, "dist/styles.css");
  fs.writeFileSync(output, `${selector}{--different-contract:black}`);
  const before = fs.readFileSync(
    path.join(stylesDir, "dist/index.css"),
    "utf8"
  );
  await expect(compileAdminTheme(rootDir, filename)).rejects.toThrow(
    "Theme contract changed"
  );
  expect(fs.readFileSync(path.join(stylesDir, "dist/index.css"), "utf8")).toBe(
    before
  );
});
