import * as path from "path";
import { runSourceMapCli } from "@nimbus-ds/scripts/src";

/**
 * Thin CLI wrapper: the actual generator lives in `@nimbus-ds/scripts`
 * (packages/core/scripts/src/sourceMap), shared with nimbus-patterns' own
 * wrapper of the same name. This file only supplies this repo's layout.
 *
 * Usage:
 *   yarn source-map          # regenerate nimbus-source-map.yml
 *   yarn source-map --check  # fail if the committed file is stale (CI)
 */
runSourceMapCli({
  repoName:
    "nimbus-design-system",

  cwd: path.resolve(
    __dirname,
    ".."
  ),

  groups: {
    atomic:
      "packages/react/src/atomic",

    composite:
      "packages/react/src/composite",
  },

  stylesRoot:
    "packages/core/styles/src/packages",

  commands: {
    install:
      "yarn install --immutable",

    buildAll:
      "yarn build",

    testAll:
      "yarn test",

    lint:
      "yarn lint",

    typesCheck:
      "yarn types:check",

    storybook:
      "yarn storybook",

    buildStorybook:
      "yarn build:storybook",

    buildOne:
      "yarn workspace {package} build",

    testOne:
      "yarn jest {path}",
  },

  shared: {
    tokens: {
      path:
        "packages/core/tokens/src",
      package:
        "@nimbus-ds/tokens",
    },

    styles: {
      path:
        "packages/core/styles/src/packages",
      package:
        "@nimbus-ds/styles",
    },

    icons: {
      path:
        "packages/icons",
      package:
        "@nimbus-ds/icons",
      assets:
        "packages/icons/src/assets",
      exportNaming:
        "arrow-left.svg -> ArrowLeftIcon",
    },

    helper: {
      path:
        "packages/helper",
      package:
        "@nimbus-ds/helper",
    },

    hooks: {
      path:
        "packages/react/src/common/hooks",
    },

    utils: {
      path:
        "packages/react/src/common/event-handling",
    },
  },

  newComponentReference:
    "packages/react/src/atomic/Box",

  storybookIndexPath:
    ".build-storybook/index.json",
});