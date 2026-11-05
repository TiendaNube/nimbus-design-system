import { promises as fs } from "fs";
import os from "os";
import path from "path";
import webpack from "webpack";
import type { Compiler } from "webpack";
import { MoveFilesIntoDistFolderPlugin } from "./MoveFilesIntoDistFolderPlugin";

describe("MoveFilesIntoDistFolderPlugin", () => {
  let projectRoot: string;
  let pkgPath: string;
  let runPlugin: () => Promise<void>;
  let compiler: Compiler;
  const originalManifest =
    '{"name":"@nimbus-ds/fixture","version":"1.0.0"}\n\n';

  beforeEach(async () => {
    projectRoot = await fs.mkdtemp(path.join(os.tmpdir(), "nimbus-manifest-"));
    pkgPath = path.join(projectRoot, "package.json");
    await fs.writeFile(pkgPath, originalManifest, { mode: 0o640 });
    await fs.chmod(pkgPath, 0o664);
    await fs.mkdir(path.join(projectRoot, "dist"));
    await fs.writeFile(path.join(projectRoot, "README.md"), "Fixture readme");
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    compiler = webpack({
      context: projectRoot,
      mode: "none",
      output: { path: path.join(projectRoot, "dist") }
    });
    new MoveFilesIntoDistFolderPlugin({
      transform: (manifest) => ({ ...manifest, main: "dist/index.js" })
    }).apply(compiler);
    const compilation = compiler.newCompilation(
      compiler.newCompilationParams()
    );
    runPlugin = () => compiler.hooks.afterEmit.promise(compilation);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    await new Promise<void>((resolve, reject) => {
      compiler.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
    await fs.rm(projectRoot, { recursive: true, force: true });
  });

  it("keeps the manifest readable while writing and preserves content, permissions and files", async () => {
    const originalMode = (await fs.stat(pkgPath)).mode;
    const writeFile = fs.writeFile.bind(fs);
    let concurrentRead = "";
    jest
      .spyOn(fs, "writeFile")
      .mockImplementation(async (file, data, options) => {
        // Pause at the truncation boundary to reproduce a concurrent Yarn reader.
        await writeFile(file, "", options);
        concurrentRead = await fs.readFile(pkgPath, "utf8");
        await writeFile(file, data);
      });

    await runPlugin();

    expect(concurrentRead).toBe(originalManifest);
    const publishedManifest = await fs.readFile(pkgPath, "utf8");
    expect(JSON.parse(publishedManifest)).toEqual({
      name: "@nimbus-ds/fixture",
      version: "1.0.0",
      main: "dist/index.js"
    });
    expect(publishedManifest.endsWith("\n\n")).toBe(true);
    expect((await fs.stat(pkgPath)).mode).toBe(originalMode);
    expect(
      await fs.readFile(path.join(projectRoot, "dist/README.md"), "utf8")
    ).toBe("Fixture readme");
    expect(console.error).not.toHaveBeenCalled();
    expect((await fs.readdir(projectRoot)).sort()).toEqual([
      "README.md",
      "dist",
      "package.json"
    ]);
  });

  it.each(["write", "rename"])(
    "preserves the original and removes temporary files after a %s failure",
    async (operation) => {
      const failure = new Error(`${operation} failed`);
      if (operation === "write") {
        const writeFile = fs.writeFile.bind(fs);
        jest.spyOn(fs, "writeFile").mockImplementation(async (file) => {
          await writeFile(file, "partial");
          throw failure;
        });
      } else {
        jest.spyOn(fs, "rename").mockRejectedValue(failure);
      }

      await runPlugin();

      expect(await fs.readFile(pkgPath, "utf8")).toBe(originalManifest);
      expect(console.error).toHaveBeenCalledWith(
        "Error in MoveFilesIntoDistFolderPlugin:",
        failure
      );
      expect((await fs.readdir(projectRoot)).sort()).toEqual([
        "README.md",
        "dist",
        "package.json"
      ]);
    }
  );
});
