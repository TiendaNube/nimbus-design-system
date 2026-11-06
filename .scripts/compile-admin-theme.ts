import fs from "fs";
import path from "path";
import postcss from "postcss";
import { compile, processVanillaFile } from "@vanilla-extract/integration";

import type { Rule } from "postcss";

// Theme value edits only replace existing declarations. New contracts/selectors
// must use the regular build so CSS and JavaScript exports stay in sync.
export const compileAdminTheme = async (
  rootDir: string,
  filename: string
): Promise<void> => {
  const stylesDir = fs.realpathSync(path.join(rootDir, "packages/core/styles"));
  const filePath = path.join(stylesDir, "src/themes", filename);
  const themeName = filename.replace(/\.css\.ts$/, "");
  const { source } = await compile({ filePath, cwd: stylesDir });
  let themeCss = "";
  await processVanillaFile({
    source,
    filePath,
    identOption: "debug",
    serializeVirtualCssPath: (file) => {
      if (file.fileScope.filePath === `src/themes/${filename}`) {
        themeCss += file.source;
      }
      return "";
    }
  });

  const generatedRules: Rule[] = [];
  postcss.parse(themeCss).walkRules((rule) => {
    generatedRules.push(rule);
  });
  if (generatedRules.length !== 1) {
    throw new Error(`Expected a single theme selector in ${filename}`);
  }
  const generatedRule = generatedRules[0];
  const declarations = (rule: Rule): string[] => {
    const names: string[] = [];
    rule.walkDecls((decl) => {
      names.push(decl.prop);
    });
    return names.sort();
  };
  const themeFiles: Record<string, string> = {
    "nimbus-theme-dark": "dark",
    "nimbus-theme-next": "next",
    "nimbus-theme-nextDark": "next-dark",
    "nimbus-theme-nextNorteui": "next-norteui",
    "nimbus-theme-nextNorteuiDark": "next-norteui-dark"
  };
  const outputs = [
    "index.css",
    "styles.css",
    `themes/${themeFiles[themeName]}.css`
  ];
  // Prepare every output before writing any file. Keep the webpack-generated
  // selector: its debug identifier differs from esbuild's identifier.
  const updates = outputs.map((output) => {
    const outputPath = path.join(stylesDir, "dist", output);
    const previous = fs.readFileSync(outputPath, "utf8");
    const css = postcss.parse(previous);
    let replaced = false;
    css.walkRules((rule) => {
      if (!rule.selector.startsWith(`.${themeName}_`)) return;
      if (
        JSON.stringify(declarations(rule)) !==
        JSON.stringify(declarations(generatedRule))
      ) {
        throw new Error(
          `Theme contract changed in ${filename}; rebuild required`
        );
      }
      rule.removeAll();
      generatedRule.nodes.forEach((node) => rule.append(node.clone()));
      replaced = true;
    });
    if (!replaced)
      throw new Error(`Missing existing ${themeName} in ${output}`);
    return { outputPath, previous, next: css.toString() };
  });
  updates.forEach(({ outputPath, previous, next }) => {
    if (previous !== next) fs.writeFileSync(outputPath, next);
  });
};
