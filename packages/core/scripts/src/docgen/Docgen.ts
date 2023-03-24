import nodePath from "path";
import * as TJS from "typescript-json-schema";
import { readFileSync, writeFileSync } from "fs";
import { camelCase, pascalCase } from "change-case";
import { defaultCompilerOptions, defaultSettings } from "./docgen.definitions";
import { DocgenOptions, Prop, Doc, Paths } from "./docgen.types";

/* eslint no-console: "off" */
export class Docgen {
  private program!: TJS.Program;

  private options: DocgenOptions = {};

  private generator: TJS.JsonSchemaGenerator | null = null;

  private paths: Paths = { components: [], subComponents: [] };

  private sourceComponent = "";

  private componentName = "";

  private componentId = "";

  private componentPath = "";

  static defaultOptions = {
    settings: defaultSettings,
    compilerOptions: defaultCompilerOptions,
  };

  constructor(options: DocgenOptions = {}) {
    // Applying user-specified options over the default options
    // and making merged options further available to the plugin methods.
    // You should probably validate all the options here as well.

    this.options = { ...Docgen.defaultOptions, ...options };
  }

  public generate(paths: Paths): void {
    this.paths = { ...this.paths, ...paths };

    // Building compiler for sent paths
    console.log("Building compiler for sent paths...");
    const allPaths = [...paths.components, ...(paths?.subComponents ?? [])];
    this.program = TJS.getProgramFromFiles(
      allPaths.map((path) => nodePath.resolve(path)),
      this.options.compilerOptions
    );
    this.generator = TJS.buildGenerator(this.program, this.options.settings);

    // Building documentation
    this.paths.components.forEach((path) => {
      this.createDoc(path);
    });
    console.log("Done!");
  }

  private createDoc(path: string): void {
    this.componentName = this.getComponentName(path);
    this.componentPath = this.getComponentPath(path);
    this.componentId = this.getComponentId();

    this.sourceComponent = this.getSource(
      `${this.componentPath}/${this.componentName}.tsx`
    );
    const polymorphicProps = this.getPolymorphicProps();
    const schema = this.getSchema(`${this.componentName}Properties`);
    const props = this.formatProps(schema, polymorphicProps);
    const subComponents = this.getSubComponents();

    const doc = {
      id: this.componentId,
      name: this.componentName,
      totalProps: props.length,
      props,
      subComponents,
    };

    const dist = `${this.componentPath}/${this.componentId}.docs.json`;
    writeFileSync(dist, JSON.stringify(doc, null, 2));
    console.log(`created ${dist} ✅`);
  }

  private formatProps(
    schema: TJS.Definition,
    polymorphicProps?: string[]
  ): Prop[] {
    const props = Object.keys(schema?.properties ?? {}).reduce(
      (prev: Prop[], curr) => {
        const property = schema?.properties?.[curr] as unknown as Prop;
        const isRequired = schema?.required
          ? schema?.required?.indexOf(curr) !== -1
          : false;

        if (property) prev.push({ ...property, required: isRequired });
        return prev;
      },
      []
    );

    if (!!polymorphicProps?.length) {
      const asDefault = this.sourceComponent.match(/As = "(\w+)",/m)?.[1] ?? "";

      props.unshift({
        defaultValue: asDefault,
        description:
          "The underlying element to render — either a HTML element name or a React component.",
        anyOf: [
          {
            enum: polymorphicProps,
            type: "string",
          },
          {
            type: "React.ElementType",
          },
        ],
        title: "as",
        required: false,
      });
    }
    return props;
  }

  private getSchema(fullTypeName: string): TJS.Definition {
    return (
      TJS.generateSchema(
        this.program,
        fullTypeName,
        this.options.settings,
        [],
        this.generator ?? undefined
      ) ?? {}
    );
  }

  private getSource(path: string): string {
    return readFileSync(path, "utf8");
  }

  private getComponentName(path: string): string {
    const fullPatch = path.match(/(\w+)\.types\.ts/gm)?.[0] ?? "";
    return pascalCase(fullPatch.replace(".types.ts", ""));
  }

  private getPolymorphicProps(): string[] {
    const match = this.sourceComponent.match(
      /PolymorphicForwardRefComponent<(["\w+" \| ]{1,}),\s\S+>/m
    )?.[1];

    return match ? match.replace(/"| /gm, "").split("|") : [];
  }

  private getComponentId(): string {
    return camelCase(this.componentName);
  }

  private getSubComponentsNames(): string[] {
    return Array.from(
      this.sourceComponent.matchAll(/^\w+\.\w+\.displayName = "(.+)";/gm),
      (m) => m[1]
    );
  }

  private getComponentPath(path: string): string {
    return path.match(/([A-z\/]+src)/gm)?.[0] ?? "";
  }

  private getSubComponents(): Doc[] {
    const subComponentsNames = this.getSubComponentsNames();
    const subComponents = subComponentsNames.reduce((prev: Doc[], curr) => {
      const subComponent = curr.replace(".", "");
      const schema = this.getSchema(`${subComponent}Properties`);
      const props = this.formatProps(schema);
      prev.push({
        name: curr,
        totalProps: props.length,
        props,
      });
      return prev;
    }, []);
    return subComponents;
  }
}

export const docgen = new Docgen();
