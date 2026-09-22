import fs from "fs";
import os from "os";
import path from "path";

import { generateSourceMap } from "./SourceMap";
import { writeYaml } from "./writeYaml";

import type { SourceMapConfig } from "./SourceMap.types";

const BASE_COMMANDS: SourceMapConfig["commands"] = {
  install:
    "yarn install --immutable",
  buildAll: "yarn build",
  testAll: "yarn test",
  lint: "yarn lint",
  typesCheck:
    "yarn types:check",
  storybook: "yarn storybook",
  buildStorybook:
    "yarn build:storybook",
  buildOne:
    "yarn workspace {package} build",
  testOne:
    "yarn jest {path}",
};

function makeFixtureRepo(): string {
  const cwd =
    fs.mkdtempSync(
      path.join(
        os.tmpdir(),
        "source-map-fixture-"
      )
    );

  const write = (
    relPath: string,
    content = ""
  ) => {
    const full =
      path.join(
        cwd,
        relPath
      );

    fs.mkdirSync(
      path.dirname(full),
      {
        recursive: true,
      }
    );

    fs.writeFileSync(
      full,
      content
    );
  };

  // Box
  write(
    "packages/react/src/atomic/Box/package.json",
    JSON.stringify({
      name:
        "@nimbus-ds/box",
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

  write(
    "packages/react/src/atomic/Box/src/box.types.ts"
  );

  write(
    "packages/react/src/atomic/Box/src/box.spec.tsx",
    `
import { Button } from "@nimbus-ds/button";
`
  );

  write(
    "packages/react/src/atomic/Box/src/box.stories.tsx",
    `
import { Icon } from "@nimbus-ds/icon";
`
  );

  write(
    "packages/react/src/atomic/Box/src/box.docs.json"
  );

  write(
    "packages/react/src/atomic/Box/src/demo/example.tsx",
    `
import { Text } from "@nimbus-ds/text";
`
  );

  write(
    "packages/core/styles/src/packages/atomic/box/index.ts"
  );

  // Table
  write(
    "packages/react/src/composite/Table/package.json",
    JSON.stringify({
      name:
        "@nimbus-ds/table",
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

  write(
    "packages/react/src/composite/Table/src/Table.tsx"
  );

  write(
    "packages/react/src/composite/Table/src/table.types.ts"
  );

  write(
    "packages/react/src/composite/Table/src/Table.definitions.ts"
  );

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

  write(
    "packages/core/styles/src/packages/composite/table/index.ts"
  );

  // Slider
  write(
    "packages/react/src/atomic/Slider/package.json",
    JSON.stringify({
      name:
        "@nimbus-ds/slider",
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

  write(
    "packages/react/src/atomic/Slider/src/slider.stories.tsx"
  );

  write(
    "packages/react/src/atomic/Slider/src/SliderRange.tsx"
  );

  write(
    "packages/react/src/atomic/Slider/src/sliderRange.stories.tsx"
  );

  write(
    "packages/react/src/atomic/Slider/src/hooks/useSliderDrag.ts"
  );

  write(
    "packages/core/styles/src/packages/atomic/slider/index.ts"
  );

  // Icons
  write(
    "packages/icons/src/assets/arrow-left.svg"
  );

  write(
    "packages/icons/src/assets/user-circle.svg"
  );

  write(
    "packages/icons/src/assets/Infinite.svg"
  );

  return cwd;
}

function baseConfig(
  cwd: string
): SourceMapConfig {
  return {
    repoName:
      "fixture-repo",

    cwd,

    groups: {
      atomic:
        "packages/react/src/atomic",
      composite:
        "packages/react/src/composite",
    },

    commands:
      BASE_COMMANDS,

    stylesRoot:
      "packages/core/styles/src/packages",

    shared: {
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

      styles: {
        path:
          "packages/core/styles/src/packages",
        package:
          "@nimbus-ds/styles",
      },
    },

    newComponentReference:
      "packages/react/src/atomic/Box",
  };
}

describe(
  "generateSourceMap",
  () => {
    let cwd: string;

    beforeEach(() => {
      cwd =
        makeFixtureRepo();
    });

    afterEach(() => {
      fs.rmSync(cwd, {
        recursive: true,
        force: true,
      });
    });

    it(
      "resolves a plain component with navigation metadata",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        const box =
          doc.components.find(
            (component) =>
              component.name ===
              "Box"
          );

        expect(box).toEqual({
          name: "Box",
          group: "atomic",
          package:
            "@nimbus-ds/box",

          path:
            "packages/react/src/atomic/Box",

          styles:
            "packages/core/styles/src/packages/atomic/box",

          exports: [
            "Box",
            "BoxProps",
            "default",
          ],

          dependencies: [
            "@nimbus-ds/skeleton",
            "@nimbus-ds/styles",
          ],

          extras: [
            "src/demo/",
          ],
        });
      }
    );

    it(
      "reads package names directly from component manifests",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        expect(
          doc.components.find(
            (component) =>
              component.name ===
              "Box"
          )?.package
        ).toBe(
          "@nimbus-ds/box"
        );

        expect(
          doc.components.find(
            (component) =>
              component.name ===
              "Table"
          )?.package
        ).toBe(
          "@nimbus-ds/table"
        );
      }
    );

    it(
      "throws when a component manifest has no package name",
      () => {
        fs.writeFileSync(
          path.join(
            cwd,
            "packages/react/src/atomic/Box/package.json"
          ),
          "{}"
        );

        expect(() =>
          generateSourceMap(
            baseConfig(cwd)
          )
        ).toThrow(
          /Missing package name/
        );
      }
    );

    it(
      "ignores spec, story and demo imports when collecting runtime dependencies",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        const box =
          doc.components.find(
            (component) =>
              component.name ===
              "Box"
          );

        expect(
          box?.dependencies
        ).toEqual([
          "@nimbus-ds/skeleton",
          "@nimbus-ds/styles",
        ]);

        expect(
          box?.dependencies
        ).not.toContain(
          "@nimbus-ds/button"
        );

        expect(
          box?.dependencies
        ).not.toContain(
          "@nimbus-ds/icon"
        );

        expect(
          box?.dependencies
        ).not.toContain(
          "@nimbus-ds/text"
        );
      }
    );

    it(
      "resolves nested subcomponents and public subcomponent exports",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        const table =
          doc.components.find(
            (component) =>
              component.name ===
              "Table"
          );

        expect(
          table?.nested
        ).toEqual([
          "TableRow",
        ]);

        expect(
          table?.contexts
        ).toEqual([
          "TableContext",
        ]);

        expect(
          table?.exports
        ).toEqual([
          "Table",
          "TableColumnLayout",
          "TableProps",
          "TableRow",
          "TableRowProps",
          "default",
        ]);

        expect(
          table?.styles
        ).toBe(
          "packages/core/styles/src/packages/composite/table"
        );

        expect(
          table?.extras
        ).toEqual([
          "src/Table.definitions.ts",
        ]);
      }
    );

    it(
      "puts a sibling top-level export and an unrelated directory in extras",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        const slider =
          doc.components.find(
            (component) =>
              component.name ===
              "Slider"
          );

        expect(
          slider?.extras
        ).toEqual([
          "src/SliderRange.tsx",
          "src/hooks/",
          "src/sliderRange.stories.tsx",
        ]);
      }
    );

    it(
      "throws on a genuine implementation ambiguity",
      () => {
        const componentDir =
          path.join(
            cwd,
            "packages/react/src/atomic/Box/src"
          );

        fs.writeFileSync(
          path.join(
            componentDir,
            "box_.tsx"
          ),
          ""
        );

        expect(() =>
          generateSourceMap(
            baseConfig(cwd)
          )
        ).toThrow(
          /Ambiguous implementation/
        );
      }
    );

    it(
      "documents mixed filename casing conventions",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        expect(
          doc.conventions
            .implementationNaming
        ).toBe(
          "Implementation keeps the component casing, e.g. Link.tsx"
        );

        expect(
          doc.conventions
            .typesNaming
        ).toBe(
          "Types usually use lower camel case, e.g. link.types.ts"
        );
      }
    );

    it(
      "exposes configured icon assets and generated export names",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        expect(
          doc.shared.icons
        ).toEqual({
          path:
            "packages/icons",

          package:
            "@nimbus-ds/icons",

          assets:
            "packages/icons/src/assets",

          exportNaming:
            "arrow-left.svg -> ArrowLeftIcon",

          available: [
            "ArrowLeftIcon",
            "InfiniteIcon",
            "UserCircleIcon",
          ],
        });
      }
    );

    it(
      "does not emit a configured asset path when the directory does not exist",
      () => {
        const config =
          baseConfig(cwd);

        config.shared.icons.assets =
          "packages/icons/src/missing-assets";

        const doc =
          generateSourceMap(
            config
          );

        expect(
          doc.shared.icons.assets
        ).toBeUndefined();

        expect(
          doc.shared.icons.available
        ).toBeUndefined();

        expect(
          doc.shared.icons.exportNaming
        ).toBe(
          "arrow-left.svg -> ArrowLeftIcon"
        );
      }
    );

    it(
      "writes navigation metadata to YAML",
      () => {
        const yaml =
          writeYaml(
            generateSourceMap(
              baseConfig(cwd)
            )
          );

        expect(yaml).toContain(
          'path: "packages/react/src/atomic/Box"'
        );

        expect(yaml).toContain(
          'styles: "packages/core/styles/src/packages/atomic/box"'
        );

        expect(yaml).toContain(
          'exports: ["Box", "BoxProps", "default"]'
        );

        expect(yaml).toContain(
          'dependencies: ["@nimbus-ds/skeleton", "@nimbus-ds/styles"]'
        );
      }
    );

    it(
      "writes icon metadata to YAML",
      () => {
        const yaml =
          writeYaml(
            generateSourceMap(
              baseConfig(cwd)
            )
          );

        expect(yaml).toContain(
          'assets: "packages/icons/src/assets"'
        );

        expect(yaml).toContain(
          'export_naming: "arrow-left.svg -> ArrowLeftIcon"'
        );

        expect(yaml).toContain(
          '- "ArrowLeftIcon"'
        );
      }
    );

    it(
      "is byte-for-byte reproducible across two runs on the same tree",
      () => {
        const first =
          writeYaml(
            generateSourceMap(
              baseConfig(cwd)
            )
          );

        const second =
          writeYaml(
            generateSourceMap(
              baseConfig(cwd)
            )
          );

        expect(first).toBe(
          second
        );
      }
    );

    it(
      "quotes every string so YAML-like values stay strings",
      () => {
        const config =
          baseConfig(cwd);

        config.repoName =
          "2026-09-15";

        const yaml =
          writeYaml(
            generateSourceMap(
              config
            )
          );

        expect(yaml).toContain(
          'name: "2026-09-15"'
        );
      }
    );

    it(
      "quotes scoped package names",
      () => {
        const yaml =
          writeYaml(
            generateSourceMap(
              baseConfig(cwd)
            )
          );

        expect(yaml).toContain(
          'package: "@nimbus-ds/box"'
        );

        expect(
          yaml
        ).not.toMatch(
          /package: @/
        );
      }
    );

    it(
      "sorts by group then name",
      () => {
        const doc =
          generateSourceMap(
            baseConfig(cwd)
          );

        const order =
          doc.components.map(
            (component) =>
              `${component.group}/${component.name}`
          );

        expect(order).toEqual(
          [...order].sort()
        );
      }
    );

    it(
      "carries no volatile field",
      () => {
        const yaml =
          writeYaml(
            generateSourceMap(
              baseConfig(cwd)
            )
          );

        expect(
          yaml
        ).not.toMatch(
          /\b\d{4}-\d{2}-\d{2}T/
        );

        expect(
          yaml.toLowerCase()
        ).not.toMatch(
          /generated[_-]?at|generator[_-]?version|source[_-]?sha/
        );
      }
    );
  }
);