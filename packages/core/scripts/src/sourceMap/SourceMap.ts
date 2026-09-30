import fs from "fs";
import path from "path";
import { compareStrings } from "./compareStrings";
import { listDirs } from "./fileSystem";
import { buildComponentEntry } from "./componentDiscovery";
import { loadStoryIndex } from "./storybookIndex";
import { enrichSharedEntries } from "./sharedMetadata";
import type {
  ComponentEntry,
  SourceMapConfig,
  SourceMapDocument,
} from "./SourceMap.types";

/**
 * Generates a deterministic source-map document from a repository
 * configuration.
 *
 * Component manifests are read directly from the repository and normalized
 * into component metadata. The generator resolves matching style paths,
 * public TypeScript entrypoint exports, Nimbus source dependencies, optional
 * Storybook entries and configured shared asset metadata.
 *
 * Missing or invalid component manifests and ambiguous implementation or style
 * matches are treated as errors rather than guessed. Optional Storybook data
 * is ignored when its index cannot be read or does not have the expected
 * structure.
 *
 * @param config Repository layout, commands and shared metadata configuration.
 * @returns The generated source-map document.
 * @throws When required component metadata is missing, invalid or ambiguous.
 */
export function generateSourceMap(config: SourceMapConfig): SourceMapDocument {
  const storyIndex =
    config.storybookIndexPath &&
    fs.existsSync(path.join(config.cwd, config.storybookIndexPath))
      ? loadStoryIndex(path.join(config.cwd, config.storybookIndexPath))
      : null;

  const components: ComponentEntry[] = [];

  for (const [group, groupDirRel] of Object.entries(config.groups)) {
    const groupDir = path.join(config.cwd, groupDirRel);

    for (const name of listDirs(groupDir)) {
      components.push(
        buildComponentEntry(
          group,
          groupDir,
          name,
          config.cwd,
          config.stylesRoot,
          storyIndex
        )
      );
    }
  }

  components.sort(
    (a, b) => compareStrings(a.group, b.group) || compareStrings(a.name, b.name)
  );

  return {
    schema: 1,

    repo: {
      name: config.repoName,
      packageManager: "yarn",
    },

    commands: config.commands,

    conventions: {
      componentRoot:
        "Use components[].path; fallback is {groups[group]}/{ComponentName}",

      entry: "src/index.ts(x)",

      implementation: "src/*.tsx",

      implementationNaming:
        "Implementation keeps the component casing, e.g. Link.tsx",

      types: "src/*.types.ts",

      typesNaming: "Types usually use lower camel case, e.g. link.types.ts",

      test: "src/*.spec.tsx",

      testNaming: "Tests usually use lower camel case, e.g. link.spec.tsx",

      stories: "src/*.stories.tsx",

      storiesNaming:
        "Stories usually use lower camel case, e.g. link.stories.tsx",

      docs: "src/*.docs.json",

      nested: "src/components/*/",

      contexts: "src/contexts/*/",

      styles: "Use components[].styles when present",

      exports:
        "Public exports resolved from src/index.ts(x) and src/components/index.ts(x)",

      dependencies:
        "Nimbus package imports under src; specs, tests, stories and demo are excluded",
    },

    groups: config.groups,

    components,

    shared: enrichSharedEntries(config.shared, config.cwd),

    newComponent: {
      reference: config.newComponentReference,
    },
  };
}
