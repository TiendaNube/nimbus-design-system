import fs from "fs";
import path from "path";
import { compareStrings } from "./compareStrings";

/**
 * Resolves a relative TypeScript module to the concrete file used by an
 * export statement.
 */
function resolveRelativeModule(
  fromFile: string,
  request: string
): string | null {
  if (!request.startsWith(".")) {
    return null;
  }

  const base = path.resolve(path.dirname(fromFile), request);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

/**
 * Returns the exported name represented by one named export specifier.
 */
function parseExportSpecifier(specifier: string): string | null {
  const cleaned = specifier.trim().replace(/^type\s+/, "");

  if (!cleaned) {
    return null;
  }

  const parts = cleaned.split(/\s+as\s+/);
  const exported = parts.length > 1 ? parts[parts.length - 1] : parts[0];

  return exported.trim() || null;
}

/**
 * Recursively resolves exports from one TypeScript entrypoint.
 */
function collectExportsFromFile(
  file: string,
  visited: Set<string>
): Set<string> {
  const exports = new Set<string>();

  if (visited.has(file)) {
    return exports;
  }

  if (!fs.existsSync(file)) {
    return exports;
  }

  visited.add(file);

  const content = fs.readFileSync(file, "utf8");

  if (/\bexport\s+default\b/.test(content)) {
    exports.add("default");
  }

  const declarationRegex =
    /\bexport\s+(?:declare\s+)?(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g;

  for (
    let match = declarationRegex.exec(content);
    match;
    match = declarationRegex.exec(content)
  ) {
    exports.add(match[1]);
  }

  const namedExportRegex =
    /\bexport\s+(?:type\s+)?\{([\s\S]*?)\}(?:\s+from\s+["'][^"']+["'])?\s*;/g;

  for (
    let match = namedExportRegex.exec(content);
    match;
    match = namedExportRegex.exec(content)
  ) {
    const specifiers = match[1].split(",");

    for (const specifier of specifiers) {
      const exported = parseExportSpecifier(specifier);

      if (exported) {
        exports.add(exported);
      }
    }
  }

  const namespaceExportRegex =
    /\bexport\s+\*\s+as\s+([A-Za-z_$][\w$]*)\s+from\s+["'][^"']+["']/g;

  for (
    let match = namespaceExportRegex.exec(content);
    match;
    match = namespaceExportRegex.exec(content)
  ) {
    exports.add(match[1]);
  }

  const starExportRegex = /\bexport\s+\*\s+from\s+["']([^"']+)["']/g;

  for (
    let match = starExportRegex.exec(content);
    match;
    match = starExportRegex.exec(content)
  ) {
    const target = resolveRelativeModule(file, match[1]);

    if (!target) {
      continue;
    }

    for (const exported of collectExportsFromFile(target, visited)) {
      if (exported !== "default") {
        exports.add(exported);
      }
    }
  }

  return exports;
}

/**
 * Resolves the public API exposed by the component package entrypoints.
 */
export function collectPublicExports(componentRoot: string): string[] {
  const entrypoints = [
    path.join(componentRoot, "src", "index.ts"),
    path.join(componentRoot, "src", "index.tsx"),
    path.join(componentRoot, "src", "components", "index.ts"),
    path.join(componentRoot, "src", "components", "index.tsx"),
  ];
  const exports = new Set<string>();
  const visited = new Set<string>();

  for (const entrypoint of entrypoints) {
    if (!fs.existsSync(entrypoint)) {
      continue;
    }

    for (const exported of collectExportsFromFile(entrypoint, visited)) {
      exports.add(exported);
    }
  }

  return [...exports].sort(compareStrings);
}
