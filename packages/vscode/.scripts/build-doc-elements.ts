import glob from "glob";
import nodepath from "path";
import { dotCase } from "change-case";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";

export class CopyDocs {
  constructor() {}

  public generate(paths: string[]): void {
    paths.forEach((path) => {
      const source = this.getSource(path);
      if (source) {
        const document = JSON.parse(source);
        const { subComponents, ...restDocument } = document;
        this.createDoc(restDocument);
        document.subComponents.forEach((docSubComponent) => {
          const newDoc = {
            id: dotCase(docSubComponent.name),
            packageName: document.packageName,
            version: document.version,
            ...docSubComponent,
          };
          this.createDoc(newDoc);
        });
      }
    });
    console.log("Done!");
  }

  private createDoc(doc: any): void {
    const basePath = nodepath.join(__dirname, `../dist/elements`);

    if (!existsSync(basePath)) {
      mkdirSync(basePath, { recursive: true });
    }

    const dist = `${basePath}/${doc.id}.docs.json`;
    writeFileSync(dist, JSON.stringify(doc, null, 2));
    console.log(`created ./dist/elements/${doc.id}.docs.json ✅`);
  }

  private getSource(path: string): string {
    return readFileSync(path, "utf8");
  }
}

export const copyDocs = new CopyDocs();

const paths = glob.sync(
  nodepath.join(__dirname, "../../react/src/*/*/src/*.docs.json")
);

copyDocs.generate(paths);
