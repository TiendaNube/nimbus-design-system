import { runPreviewLinksCli } from "@nimbus-ds/scripts/src";

/**
 * Thin CLI wrapper: the actual resolution logic lives in `@nimbus-ds/scripts`
 * (packages/core/scripts/src/storybookPreviewLinks), shared with
 * nimbus-patterns' own wrapper of the same name. This file only supplies
 * this repo's component-tree layout.
 *
 * Usage (reads the changed file list from a file, or from stdin):
 *   STORYBOOK_URL=https://host/index.html yarn preview:links changed-files.txt
 */
runPreviewLinksCli({
  componentRootPattern: /^packages\/react\/src\/(?:atomic|composite)\/[^/]+/,
  stylesComponentPattern:
    /^packages\/core\/styles\/src\/packages\/(?:atomic|composite)\/([^/]+)/,
});
