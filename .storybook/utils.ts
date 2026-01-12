import path from "path";

export const argTypesConvert = (properties: any) =>
  Object.keys(properties).reduce(
    (
      prev: { [key: string]: { control: string; options: string[] } },
      curr: string
    ) => {
      let options: string[] = [];
      const value = properties[curr];

      if (Array.isArray(value)) {
        options = value;
      } else if (typeof value === "object" && value !== null) {
        options = Object.keys(value);
      }

      if (options.length > 0) {
        prev[curr] = {
          control: options.length > 6 ? "select" : "radio",
          options,
        };
      }

      return prev;
    },
    {}
  );

/**
 * Maps BoxProps to appropriate Storybook argTypes controls.
 * Props that can't be interacted with in Storybook (like ref) are hidden.
 * Props with predefined values (from dynamicProperties and staticProperties) get select/radio controls.
 * True dynamic properties (accepting any string) are mapped to text inputs.
 * All Box props are categorized under "Layout & Styling" to ensure they appear after
 * component-specific props which should use the default category.
 *
 * @param exclude - Array of BoxProps property names to exclude from Storybook controls
 * @returns Storybook argTypes configuration object with categorized Box properties
 */
export const mapBoxProps = (exclude: string[] = []) => {
  const { box } = require("@nimbus-ds/styles");

  const alwaysHidden = ["ref", "className", "style", "as"];

  const trueDynamicProps = [
    "width",
    "height",
    "maxWidth",
    "maxHeight",
    "minWidth",
    "minHeight",
    "bottom",
    "left",
    "right",
    "top",
    "flex",
    "gridTemplateAreas",
    "gridTemplateColumns",
    "gridTemplateRows",
    "gridArea",
    "flexShrink",
    "flexGrow",
    "order",
    "transitionDelay",
    "transitionProperty",
    "backgroundImage",
    "backgroundPosition",
    "backgroundBlendMode",
    "backgroundRepeat",
    "backgroundSize",
  ];

  const allPropsToHide = [...alwaysHidden, ...exclude];

  const argTypes: Record<string, unknown> = {};

  allPropsToHide.forEach((prop) => {
    argTypes[prop] = { table: { disable: true } };
  });

  trueDynamicProps.forEach((prop) => {
    if (!allPropsToHide.includes(prop)) {
      argTypes[prop] = {
        control: "text",
        table: {
          category: "Layout & Styling",
        },
      };
    }
  });

  const allBoxProperties = {
    ...box.properties,
    padding: box.properties.spacing,
    paddingTop: box.properties.spacing,
    paddingBottom: box.properties.spacing,
    paddingLeft: box.properties.spacing,
    paddingRight: box.properties.spacing,
    paddingX: box.properties.spacing,
    paddingY: box.properties.spacing,
    marginTop: box.properties.margin,
    marginBottom: box.properties.margin,
    marginLeft: box.properties.margin,
    marginRight: box.properties.margin,
    marginX: box.properties.margin,
    marginY: box.properties.margin,
    borderTopWidth: box.properties.borderWidth,
    borderBottomWidth: box.properties.borderWidth,
    borderLeftWidth: box.properties.borderWidth,
    borderRightWidth: box.properties.borderWidth,
    borderWidthX: box.properties.borderWidth,
    borderWidthY: box.properties.borderWidth,
    pt: box.properties.spacing,
    pb: box.properties.spacing,
    pl: box.properties.spacing,
    pr: box.properties.spacing,
    m: box.properties.margin,
    mr: box.properties.margin,
    ml: box.properties.margin,
    mt: box.properties.margin,
    mb: box.properties.margin,
    mx: box.properties.margin,
    my: box.properties.margin,
    p: box.properties.spacing,
    px: box.properties.spacing,
    py: box.properties.spacing,
  };

  Object.entries(argTypesConvert(allBoxProperties)).forEach(([key, value]) => {
    if (!allPropsToHide.includes(key) && !trueDynamicProps.includes(key)) {
      argTypes[key] = {
        ...value,
        table: {
          category: "Layout & Styling",
        },
      };
    }
  });

  return argTypes;
};

export const convertTsConfigPathsToWebpackAliases = () => {
  const rootDir = path.resolve(__dirname, "../");
  const tsconfig = require("../tsconfig.json");
  const tsconfigPaths = Object.entries(tsconfig.compilerOptions.paths);

  const paths = tsconfigPaths.reduce(
    (aliases: any, [realPath, mappedPath]: any) => {
      const packageName = mappedPath[0].split("/")[5];
      const alias = `${mappedPath[0]}/${packageName}.tsx`;
      aliases[realPath] = path.join(rootDir, alias);
      return aliases;
    },
    {}
  );

  paths["@nimbus-ds/tokens"] = path.join(rootDir, "packages/core/tokens");
  paths["@nimbus-ds/icons"] = path.join(rootDir, "packages/icons");
  paths["@nimbus-ds/styles"] = path.join(
    rootDir,
    "packages/core/styles/src/index.ts"
  );
  paths["@nimbus-ds/webpack"] = path.join(
    rootDir,
    "packages/core/webpack/src/index.ts"
  );
  paths["@nimbus-ds/typings"] = path.join(
    rootDir,
    "packages/core/typings/src/index.ts"
  );
  paths[".storybook"] = path.join(rootDir, ".storybook");
  paths["@common"] = path.join(rootDir, "packages/react/src/common");
  return paths;
};
