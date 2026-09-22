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

export interface SharedEntry {
  path: string;
  package?: string;

  /**
   * Optional path containing assets exported by the shared package.
   * Currently used by @nimbus-ds/icons.
   */
  assets?: string;

  /**
   * Human-readable convention describing how asset names map to exports.
   * Example: `arrow-left.svg -> ArrowLeftIcon`.
   */
  exportNaming?: string;

  /**
   * Concrete exports available from the package, generated from the source
   * tree so agents can validate a name without browsing the entire directory.
   */
  available?: string[];
}

/**
 * Where a repo's components live and how its workspaces are shaped.
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

  shared: Record<string, SharedEntry>;

  /**
   * Optional root containing the style packages grouped by the same group
   * names used by `groups`.
   *
   * Example:
   * packages/core/styles/src/packages/atomic/link
   */
  stylesRoot?: string;

  /** A real, representative component directory other repos can point new ones at. */
  newComponentReference: string;

  /**
   * Path (relative to `cwd`) to a Storybook `index.json` (from
   * `storybook build`). When present, each component's `story` field is
   * resolved from it; when absent, `story` is omitted rather than guessed.
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

  /**
   * Concrete path to the component root.
   */
  path: string;

  /**
   * Concrete path to the component's styles when a matching style package
   * exists.
   */
  styles?: string;

  /**
   * Public exports exposed by the package entrypoints.
   */
  exports?: string[];

  /**
   * Nimbus packages imported by runtime source files.
   */
  dependencies?: string[];

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
  shared: Record<string, SharedEntry>;

  newComponent: {
    reference: string;
  };
}