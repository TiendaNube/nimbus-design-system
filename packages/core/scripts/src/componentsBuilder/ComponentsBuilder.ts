import fs from "fs";
import { PackageBuilder } from "../packageBuilder";

export class ComponentsBuilder {
  private PATH: string;

  constructor(packagesPath: string = "./packages/react/src/") {
    this.PATH = packagesPath;
  }

  private getComponentsFrom(path: string): string[] {
    const components = [];

    const readComponents = fs.readdirSync(`${this.PATH}/${path}`);
    for (const component of readComponents) {
      const packageJsonContent = fs.readFileSync(
        `${this.PATH}/${path}/${component}/package.json`,
        "utf-8"
      );
      const json = JSON.parse(packageJsonContent);
      const componentName = json.name;
      components.push(componentName);
    }
    return components;
  }

  public exec(...subPaths: string[]) {
    // eslint-disable-next-line no-console
    console.log("⚙️ Building components on paths: ", subPaths.join(", "));

    const allComponents: string[] = subPaths
      .map((subPath) => this.getComponentsFrom(subPath).flat())
      .flat();

    const componentsCommand = allComponents
      .map((component) => `--filter=${component}`)
      .join(" ");

    new PackageBuilder().execCommand(`turbo run build ${componentsCommand}`);
  }
}
