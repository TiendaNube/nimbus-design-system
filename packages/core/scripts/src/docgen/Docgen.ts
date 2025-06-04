import nodePath from "path";
import * as TJS from "typescript-json-schema";
import { readFileSync, writeFileSync } from "fs";
import { camelCase, pascalCase, paramCase } from "change-case";
import { defaultCompilerOptions, defaultSettings } from "./docgen.definitions";
import { DocgenOptions, Prop, Doc, Paths, GeneratedDoc } from "./docgen.types";

/* eslint no-console: "off" */
export class Docgen {
  private program!: TJS.Program;

  private options: DocgenOptions = {};

  private generator: TJS.JsonSchemaGenerator | null = null;

  private paths: Paths = { components: [], subComponents: [] };

  private component = {
    id: "",
    name: "",
    path: "",
    source: "",
    sourcePackage: "",
  };

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

  public generateBundle(docs: GeneratedDoc[], outputPath: string): void {
    const docById = docs.reduce((acc, doc) => {
      acc[doc.id] = doc;
      return acc;
    }, {} as Record<string, Doc>);

    // Minify the docs
    const minifiedDocs = JSON.parse(JSON.stringify(docById));

    writeFileSync(outputPath, JSON.stringify(minifiedDocs, null, 2));

    console.log(`Bundle documentation generated successfully in ${outputPath}`);
  }

  public generate(paths: Paths): GeneratedDoc[] {
    this.paths = { ...this.paths, ...paths };

    console.log(`Building documentation for ${paths.components.length} components...`);
    const allPaths = [...paths.components, ...(paths?.subComponents ?? [])];
    this.program = TJS.getProgramFromFiles(
      allPaths.map((path) => nodePath.resolve(path)),
      this.options.compilerOptions
    );
    this.generator = TJS.buildGenerator(this.program, this.options.settings);

    // Building documentation
    const docs = this.paths.components.map((path) => this.createDoc(path));

    console.log("Documentation generated successfully");
    return docs;
  }

  private createDoc(path: string): GeneratedDoc {
    console.log(`Creating documentation for ${path}...`);

    this.component.name = this.getComponentName(path);
    this.component.path = this.getComponentPath(path);
    this.component.id = this.getComponentId();

    this.component.source = this.getSource(
      `${this.component.path}/${this.component.name}.tsx`
    );

    this.component.sourcePackage = this.getSource(
      `${this.component.path.replace(
        `${this.component.name}/src`,
        this.component.name
      )}/package.json`
    );

    const polymorphicProps = this.getPolymorphicProps();
    const schema = this.getSchema(`${this.component.name}Properties`);
    const props = this.formatProps(schema, polymorphicProps);
    const packageName = this.getPackageName();
    const version = this.getVersion();
    const docLink = this.generateDocLink();
    const subComponents = this.getSubComponents();

    const doc: GeneratedDoc = {
      id: this.component.id,
      name: this.component.name,
      totalProps: props.length,
      packageName,
      version,
      docLink,
      props,
      subComponents,
    };

    const dist = `${this.component.path}/${this.component.id}.docs.json`;
    writeFileSync(dist, JSON.stringify(doc, null, 2));
    console.log(`created ${dist} ✅`);

    return doc;
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
      const asDefault =
        this.component.source.match(/As = "(\w+)",/m)?.[1] ?? "";

      props.unshift({
        default: asDefault,
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
    try {
      const schema = TJS.generateSchema(
        this.program,
        fullTypeName,
        this.options.settings,
        [],
        this.generator ?? undefined
      );

      if (!schema) {
        // Warn and continue if no schema is found, as it might be the case for some components. We don't want to break the process.
        console.warn(`No schema found for ${fullTypeName}`);
        return {};
      }

      return schema;
    } catch (error) {
      console.log(`Error generating the schema for ${fullTypeName}`, error);
      return {};
    }
  }

  private getSource(path: string): string {
    return readFileSync(path, "utf8");
  }

  private getComponentName(path: string): string {
    const regex = RegExp("(\\w+)\\.types\\.ts", "gm");
    const fullPatch = regex.exec(path)?.[0] ?? "";
    return pascalCase(fullPatch.replace(".types.ts", ""));
  }

  private getPackageName(): string {
    const regex = RegExp('"name": "(.+)"', "m");
    return regex.exec(this.component.sourcePackage)?.[1] ?? "";
  }

  private getVersion(): string {
    const regex = RegExp('"version": "(.+)"', "m");
    return regex.exec(this.component.sourcePackage)?.[1] ?? "";
  }

  private generateDocLink(): string {
    const context = this.component.path.split("/")?.[3] || "";
    return `https://nimbus.nuvemshop.com.br/documentation/${context}-components/${paramCase(
      this.component.id
    )}`;
  }

  private getPolymorphicProps(): string[] {
    const regex = RegExp("PolymorphicForwardRefComponent<(.+),.+> &$", "m");
    const match = regex.exec(this.component.source)?.[1] ?? "";
    return match ? match.replace(/[" ]/gm, "").split("|") : [];
  }

  private getComponentId(): string {
    return camelCase(this.component.name);
  }

  private getSubComponentsNames(): string[] {
    return Array.from(
      this.component.source.matchAll(/^\w+\.\w+\.displayName =\n?.+"(.+)";/gm),
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
