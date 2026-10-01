/**
 * Field names are camelCase in code and mapped to the schema's snake_case
 * YAML keys (`build_all`, `test_one`, ...) only in `writeYaml.ts` — the repo's
 * lint rules require camelCase identifiers, and the YAML schema is fixed
 * independently of that.
 */
export interface SourceMapCommands {
  install: string;
  buildAll: string;
  testAll: string;
  lint: string;
  typesCheck: string;
  storybook: string;
  buildStorybook: string;
  /** `{package}` and `{path}` are substituted with each component's values. */
  buildOne: string;
  testOne: string;
}

/**
 * Where a repo's components live and how its workspaces are shaped. Both
 * repos share the same file-level conventions (resolved by glob in
 * `SourceMap.ts`); this is the only part that differs between them.
 */
export interface SourceMapConfig {
  repoName: string;
  /** Absolute path to the repo root the generator runs against. */
  cwd: string;
  commands: SourceMapCommands;
  /**
   * Group name -> directory holding one subdirectory per component,
   * relative to `cwd`. E.g. `{ atomic: "packages/react/src/atomic" }`.
   */
  groups: Record<string, string>;
  shared: Record<string, { path: string; package?: string }>;
  /** A real, representative component directory other repos can point new ones at. */
  newComponentReference: string;
  /**
   * Path (relative to `cwd`) to a Storybook `index.json` (from
   * `storybook build`). When present, each component's `story` field is
   * resolved from it; when absent, `story` is omitted rather than guessed —
   * Storybook's own id sanitizer cannot be reproduced by hand reliably.
   */
  storybookIndexPath?: string;
}

export interface YarnWorkspace {
  name: string;
  location: string;
}

export interface ComponentEntry {
  name: string;
  group: string;
  package: string;
  story?: string;
  nested?: string[];
  contexts?: string[];
  /**
   * Files under the component that the shared conventions do not account
   * for (loose assets, a `*.definitions.ts`, a stray root `index.d.ts`).
   * Generic by construction: nothing here is keyed by component name.
   */
  extras?: string[];
}

export interface SourceMapDocument {
  schema: 1;
  repo: {
    name: string;
    packageManager: "yarn";
  };
  commands: SourceMapCommands;
  conventions: Record<string, string>;
  groups: Record<string, string>;
  components: ComponentEntry[];
  shared: Record<string, { path: string; package?: string }>;
  newComponent: {
    reference: string;
  };
}
