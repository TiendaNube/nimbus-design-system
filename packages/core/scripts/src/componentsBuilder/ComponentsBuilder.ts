import fs from "fs";
import { PackageBuilder } from "../packageBuilder";

export class ComponentsBuilder {
  private PATH = "./packages/react/src/";

  private getComponentsFrom(path: string): string[] {
    const components = [];
    const atomicComponents = fs.readdirSync(`${this.PATH}/${path}`);
    for (const atomicComponent of atomicComponents) {
      const packageJsonContent = fs.readFileSync(
        `${this.PATH}/${path}/${atomicComponent}/package.json`,
        "utf-8"
      );
      const json = JSON.parse(packageJsonContent);
      const componentName = json.name;
      components.push(componentName);
    }
    return components;
  }

  public exec() {
    const atomicComponents = this.getComponentsFrom("atomic");
    const compositeComponents = this.getComponentsFrom("composite");

    const componentsCommand = [...atomicComponents, ...compositeComponents]
      .map((component) => `--filter=${component}`)
      .join(" ");

    new PackageBuilder().execCommand(`turbo run build ${componentsCommand}`);
  }
}
