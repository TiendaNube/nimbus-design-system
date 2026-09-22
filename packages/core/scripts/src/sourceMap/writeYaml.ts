import { compareStrings } from "./compareStrings";
import type {
  ComponentEntry,
  SharedEntry,
  SourceMapCommands,
  SourceMapDocument,
} from "./SourceMap.types";

/**
 * A minimal, deterministic YAML emitter for exactly this document's shape —
 * not a general-purpose serializer. The schema is fixed and known, so a
 * dependency-free emitter that never has to guess how to represent an
 * arbitrary value is safer than pulling in a YAML library for a handful of
 * scalars, flat maps and one array of small objects.
 */

const HEADER = [
  "# GENERATED FILE — do not edit by hand.",
  "# Regenerate with: yarn source-map",
  "",
];

/** camelCase field names in code -> the schema's fixed snake_case YAML keys. */
const COMMAND_KEYS: Record<keyof SourceMapCommands, string> = {
  install: "install",
  buildAll: "build_all",
  testAll: "test_all",
  lint: "lint",
  typesCheck: "types_check",
  storybook: "storybook",
  buildStorybook: "build_storybook",
  buildOne: "build_one",
  testOne: "test_one",
};

function toYamlCommands(
  commands: SourceMapCommands
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [field, yamlKey] of Object.entries(COMMAND_KEYS)) {
    result[yamlKey] = commands[field as keyof SourceMapCommands];
  }

  return result;
}

/**
 * Always quoted, never a plain-scalar allowlist: a plain `true`, `null`,
 * `123` or `2026-09-15` would otherwise be coerced by a YAML parser to a
 * boolean, null, number or timestamp instead of staying the string it is.
 */
function quoteIfNeeded(value: string): string {
  return JSON.stringify(value);
}

function scalarLine(value: string): string {
  return quoteIfNeeded(value);
}

function flatMap(
  map: Record<string, string>,
  indent: string
): string[] {
  return Object.keys(map)
    .sort(compareStrings)
    .map((key) => `${indent}${key}: ${scalarLine(map[key])}`);
}

function inlineArray(items: string[]): string {
  return `[${items.map(quoteIfNeeded).join(", ")}]`;
}

function componentLine(entry: ComponentEntry): string {
  const fields = [
    `name: ${scalarLine(entry.name)}`,
    `group: ${scalarLine(entry.group)}`,
    `package: ${scalarLine(entry.package)}`,
  ];

  if (entry.story) {
    fields.push(`story: ${scalarLine(entry.story)}`);
  }

  if (entry.nested?.length) {
    fields.push(`nested: ${inlineArray(entry.nested)}`);
  }

  if (entry.contexts?.length) {
    fields.push(`contexts: ${inlineArray(entry.contexts)}`);
  }

  if (entry.extras?.length) {
    fields.push(`extras: ${inlineArray(entry.extras)}`);
  }

  return `  - { ${fields.join(", ")} }`;
}

function sharedEntryLines(
  key: string,
  value: SharedEntry
): string[] {
  const hasExtendedMetadata =
    value.assets !== undefined ||
    value.exportNaming !== undefined ||
    Boolean(value.available?.length);

  if (!hasExtendedMetadata) {
    const fields = [`path: ${scalarLine(value.path)}`];

    if (value.package) {
      fields.push(`package: ${scalarLine(value.package)}`);
    }

    return [`  ${key}: { ${fields.join(", ")} }`];
  }

  const lines = [
    `  ${key}:`,
    `    path: ${scalarLine(value.path)}`,
  ];

  if (value.package) {
    lines.push(`    package: ${scalarLine(value.package)}`);
  }

  if (value.assets) {
    lines.push(`    assets: ${scalarLine(value.assets)}`);
  }

  if (value.exportNaming) {
    lines.push(
      `    export_naming: ${scalarLine(value.exportNaming)}`
    );
  }

  if (value.available?.length) {
    lines.push("    available:");

    for (const item of value.available) {
      lines.push(`      - ${scalarLine(item)}`);
    }
  }

  return lines;
}

export function writeYaml(doc: SourceMapDocument): string {
  const lines: string[] = [...HEADER];

  lines.push(`schema: ${doc.schema}`, "");

  lines.push("repo:");
  lines.push(`  name: ${scalarLine(doc.repo.name)}`);
  lines.push(
    `  package_manager: ${scalarLine(doc.repo.packageManager)}`
  );
  lines.push("");

  lines.push("commands:");
  lines.push(...flatMap(toYamlCommands(doc.commands), "  "));
  lines.push("");

  lines.push("conventions:");
  lines.push(...flatMap(doc.conventions, "  "));
  lines.push("");

  lines.push("groups:");
  lines.push(...flatMap(doc.groups, "  "));
  lines.push("");

  lines.push("components:");

  for (const entry of doc.components) {
    lines.push(componentLine(entry));
  }

  lines.push("");

  lines.push("shared:");

  for (const key of Object.keys(doc.shared).sort(compareStrings)) {
    lines.push(...sharedEntryLines(key, doc.shared[key]));
  }

  lines.push("");

  lines.push("new_component:");
  lines.push(
    `  reference: ${scalarLine(doc.newComponent.reference)}`
  );
  lines.push("");

  return lines.join("\n");
}