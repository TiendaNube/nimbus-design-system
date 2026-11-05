import fs from "fs";
import path from "path";
import { execSync, execFileSync } from "child_process";

/* eslint no-console: "off" */
export class PackageBuilder {
  public getPackagesToBuild(paths: string | string[]): string[] {
    const files = typeof paths === "string" ? [paths] : paths;
    return [
      ...new Set(
        files.flatMap((file) =>
          this.processVersions(this.getContentVersions(file))
        )
      ),
    ];
  }

  // Yarn writes a small YAML subset. Reject unsupported release syntax rather
  // than silently losing a package; no transitive YAML dependency is required.
  private processVersions(content: string): string[] {
    let inReleases = false;
    const packages: string[] = [];
    for (const line of content.split(/\r?\n/)) {
      if (line.startsWith("releases:")) {
        inReleases = this.isReleaseBlock(line);
        continue;
      }
      if (line.startsWith("declined:") || line.startsWith("undecided:")) {
        inReleases = false;
        continue;
      }
      if (!inReleases || !line.trim() || line.trimStart().startsWith("#"))
        continue;
      const packageName = this.parseReleaseLine(line);
      if (packageName) packages.push(packageName);
    }
    return packages;
  }

  private isReleaseBlock(line: string): boolean {
    if (/^releases:\s*(?:#.*)?$/.test(line)) return true;
    if (/^releases:\s*\{\}\s*(?:#.*)?$/.test(line)) return false;
    throw new Error(`Unsupported deferred release record: ${line}`);
  }

  private parseReleaseLine(line: string): string | null {
    const release =
      /^ {2}("[^"\n]+"|'[^'\n]+'|[^\s:]+):\s*(\S+)\s*(?:#.*)?$/.exec(line);
    if (!release)
      throw new Error(`Unsupported deferred release record: ${line}`);
    const decision = release[2];
    const supported =
      ["major", "minor", "patch", "prerelease", "decline"].includes(decision) ||
      /^\d+\.\d+\.\d+(?:-[\dA-Za-z.-]+)?$/.test(decision);
    if (!supported)
      throw new Error(`Unsupported deferred release record: ${line}`);
    if (decision === "decline") return null;
    return release[1].replace(/^["']|["']$/g, "");
  }

  /**
   * Build selected workspaces and their dependencies from the repository root,
   * which contains the pinned Yarn CLI under `.yarn/releases`.
   * @param packages Workspace names to build; an empty selection is a no-op.
   * @param removePackages Names excluded from selection and passed to Turbo's exclusion filters.
   * @param force Whether to bypass Turbo's build cache.
   */
  public build(
    packages: string[],
    removePackages: string[] = [],
    force = false
  ): void {
    const selected = [...new Set(packages)].filter(
      (name) => !removePackages.includes(name)
    );
    if (!selected.length) {
      console.log("No packages selected; skipping build.");
      return;
    }
    // Invoke this repository's pinned Yarn with the running Node executable.
    // Neither executable is looked up through PATH.
    execFileSync(
      process.execPath,
      [
        path.resolve(".yarn/releases/yarn-3.2.2.cjs"),
        "turbo",
        "run",
        "build",
        ...(force ? ["--force"] : []),
        ...selected.map((name) => `--filter=${name}...`),
        ...removePackages.map((name) => `--filter=!${name}`),
      ],
      { stdio: "inherit" }
    );
  }

  public getCommandBuildNPM(
    packages: string[],
    removePackages: string[] = []
  ): string {
    const filteredPackages = packages.filter(
      (pack) => !removePackages.includes(pack)
    );

    if (!filteredPackages.length) return "";

    const removeFilters = removePackages
      .map((pack) => `--filter=!${pack}`)
      .join(" ");

    return filteredPackages.reduce((prev, curr) => {
      prev = prev + ` --filter=${curr}...`;
      return prev;
    }, `turbo run build ${removeFilters}`);
  }

  public execCommand(command: string): void {
    if (!command.trim()) return;
    console.log(`\x1b[32m 🏃‍♂️ Running building packages...  \x1b[0m`);
    execSync(command, { stdio: "inherit" });
  }

  public async triggerBuildGithubAction(
    url: string,
    body: { [key: string]: string }
  ) {
    try {
      if (!process.env.GITHUB_TOKEN) {
        throw new Error(
          "You need to set an environment variable called GITHUB_TOKEN with your personal git token"
        );
      }

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify(body),
      });
      console.log(`\x1b[32m 🏃‍♂️ Running building github action...  \x1b[0m`);
    } catch (error: any) {
      throw new Error(
        `An error occurred while executing an action: ${error.message}`
      );
    }
  }

  private getContentVersions(path: string): string {
    try {
      return fs.readFileSync(path, "utf8");
    } catch (error) {
      throw new Error(
        "The versions file was not found so it was not possible to perform the build..."
      );
    }
  }
}
