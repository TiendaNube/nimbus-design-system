import fs from "fs";
import path from "path";
import os from "os";
import type { SourceMapConfig } from "./SourceMap.types";

const BASE_COMMANDS: SourceMapConfig["commands"] = {
  install: "yarn install --immutable",
  buildAll: "yarn build",
  testAll: "yarn test",
  lint: "yarn lint",
  typesCheck: "yarn types:check",
  storybook: "yarn storybook",
  buildStorybook: "yarn build:storybook",
  buildOne: "yarn workspace {package} build",
  testOne: "yarn jest {path}",
};

export function makeFixtureRepo(): string {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "source-map-fixture-"));

  const write = (relPath: string, content = "") => {
    const full = path.join(cwd, relPath);

    fs.mkdirSync(path.dirname(full), {
      recursive: true,
    });

    fs.writeFileSync(full, content);
  };

  // Box
  write(
    "packages/react/src/atomic/Box/package.json",
    JSON.stringify({
      name: "@nimbus-ds/box",
    })
  );

  write(
    "packages/react/src/atomic/Box/src/index.ts",
    `
import { Box } from "./Box";

export { Box } from "./Box";
export type { BoxProps } from "./Box";
export default Box;
`
  );

  write(
    "packages/react/src/atomic/Box/src/Box.tsx",
    `
import { box } from "@nimbus-ds/styles";
import { Skeleton } from "@nimbus-ds/skeleton";

export const Box = () => null;
export type BoxProps = {};
`
  );

  write("packages/react/src/atomic/Box/src/box.types.ts");

  write(
    "packages/react/src/atomic/Box/src/box.spec.tsx",
    `
import { Button } from "@nimbus-ds/button";
`
  );

  write(
    "packages/react/src/atomic/Box/src/box.test.tsx",
    `
import { Tooltip } from "@nimbus-ds/tooltip";
`
  );

  write(
    "packages/react/src/atomic/Box/src/box.stories.tsx",
    `
import { Icon } from "@nimbus-ds/icon";
`
  );

  write("packages/react/src/atomic/Box/src/box.docs.json");

  write(
    "packages/react/src/atomic/Box/src/demo/example.tsx",
    `
import { Text } from "@nimbus-ds/text";
`
  );

  write("packages/core/styles/src/packages/atomic/box/index.ts");

  // Table
  write(
    "packages/react/src/composite/Table/package.json",
    JSON.stringify({
      name: "@nimbus-ds/table",
    })
  );

  write(
    "packages/react/src/composite/Table/src/index.ts",
    `
import { Table } from "./Table";

export { Table } from "./Table";
export type { TableProps, TableColumnLayout } from "./table.types";
export default Table;
`
  );

  write("packages/react/src/composite/Table/src/Table.tsx");

  write("packages/react/src/composite/Table/src/table.types.ts");

  write("packages/react/src/composite/Table/src/Table.definitions.ts");

  write(
    "packages/react/src/composite/Table/src/components/index.ts",
    `
export * from "./TableRow";
`
  );

  write(
    "packages/react/src/composite/Table/src/components/TableRow/index.ts",
    `
export { TableRow } from "./TableRow";
export type { TableRowProps } from "./TableRow";
`
  );

  write(
    "packages/react/src/composite/Table/src/components/TableRow/TableRow.tsx",
    `
export const TableRow = () => null;
export type TableRowProps = {};
`
  );

  write(
    "packages/react/src/composite/Table/src/contexts/TableContext/TableContext.tsx"
  );

  write("packages/core/styles/src/packages/composite/table/index.ts");

  // Slider
  write(
    "packages/react/src/atomic/Slider/package.json",
    JSON.stringify({
      name: "@nimbus-ds/slider",
    })
  );

  write(
    "packages/react/src/atomic/Slider/src/index.ts",
    `
export { Slider } from "./Slider";
`
  );

  write(
    "packages/react/src/atomic/Slider/src/Slider.tsx",
    `
export const Slider = () => null;
`
  );

  write("packages/react/src/atomic/Slider/src/slider.stories.tsx");

  write("packages/react/src/atomic/Slider/src/SliderRange.tsx");

  write("packages/react/src/atomic/Slider/src/sliderRange.stories.tsx");

  write("packages/react/src/atomic/Slider/src/hooks/useSliderDrag.ts");

  write("packages/core/styles/src/packages/atomic/slider/index.ts");

  // Component using a TSX package entrypoint
  write(
    "packages/react/src/atomic/TsxEntry/package.json",
    JSON.stringify({
      name: "@nimbus-ds/tsx-entry",
    })
  );

  write(
    "packages/react/src/atomic/TsxEntry/src/index.tsx",
    `
import { TsxEntry } from "./TsxEntry";

export { TsxEntry } from "./TsxEntry";
export type { TsxEntryProps } from "./TsxEntry";
export default TsxEntry;
`
  );

  write(
    "packages/react/src/atomic/TsxEntry/src/TsxEntry.tsx",
    `
export const TsxEntry = () => null;
export type TsxEntryProps = {};
`
  );

  // Component using Nimbus re-exports
  write(
    "packages/react/src/atomic/Reexporter/package.json",
    JSON.stringify({
      name: "@nimbus-ds/reexporter",
    })
  );

  write(
    "packages/react/src/atomic/Reexporter/src/index.ts",
    `
export { Button } from "@nimbus-ds/button";
export * from "@nimbus-ds/typings";
`
  );

  // Icons
  write("packages/icons/src/assets/arrow-left.svg");

  write("packages/icons/src/assets/user-circle.svg");

  write("packages/icons/src/assets/Infinite.svg");

  return cwd;
}

export function baseConfig(cwd: string): SourceMapConfig {
  return {
    repoName: "fixture-repo",

    cwd,

    groups: {
      atomic: "packages/react/src/atomic",
      composite: "packages/react/src/composite",
    },

    commands: BASE_COMMANDS,

    stylesRoot: "packages/core/styles/src/packages",

    shared: {
      icons: {
        path: "packages/icons",

        package: "@nimbus-ds/icons",

        assets: "packages/icons/src/assets",

        exportNaming: "arrow-left.svg -> ArrowLeftIcon",
      },

      styles: {
        path: "packages/core/styles/src/packages",
        package: "@nimbus-ds/styles",
      },
    },

    newComponentReference: "packages/react/src/atomic/Box",
  };
}
