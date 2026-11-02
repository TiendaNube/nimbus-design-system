import fs from "fs";
import { execSync } from "child_process";

const RELEASE_SECTION_REGEX = /^releases\s*:/;
const TOP_LEVEL_KEY_REGEX = /^[A-Za-z0-9_@-]+\s*:/;
const RELEASE_ENTRY_REGEX = /^ {2,}"?(@[^":\s]+|[A-Za-z0-9_.-]+)"?\s*:/;

/* eslint no-console: "off" */
export class PackageBuilder {
  /**
   * Parses a `.yarn/versions/*.yml` manifest file and returns the list of package names.
   */
  public getPackagesToBuild(path: string): string[] {
    const content = this.getContentVersions(path);
    return this.processVersions(content);
  }

  /**
   * Collects the deduplicated union of package names across multiple `.yarn/versions/*.yml` files.
   */
  public getPackagesToBuildFromPaths(paths: string[]): string[] {
    const union = new Set<string>();
    for (const manifestPath of paths) {
      for (const pkg of this.getPackagesToBuild(manifestPath)) {
        union.add(pkg);
      }
    }
    return Array.from(union);
  }

  /**
   * Extracts package names from the `releases:` block of a Yarn version manifest.
   */
  private processVersions(content: string): string[] {
    const lines = content.split(/\r?\n/);
    const packages: string[] = [];
    let inReleases = false;

    for (const line of lines) {
      if (RELEASE_SECTION_REGEX.test(line)) {
        inReleases = true;
        continue;
      }
      if (inReleases) {
        if (TOP_LEVEL_KEY_REGEX.test(line)) {
          break;
        }
        const match = RELEASE_ENTRY_REGEX.exec(line);
        if (match?.[1]) {
          packages.push(match[1].split('"').join(""));
        }
      }
    }

    if (packages.length > 0) {
      return Array.from(new Set(packages));
    }

    const regex = /^ {2}"?([^":]+)"?:/gm;
    return Array.from(
      new Set(
        Array.from(content.matchAll(regex), (match) =>
          match[1].split('"').join("")
        )
      )
    );
  }

  public getCommandBuildNPM(
    packages: string[],
    removePackages: string[] = []
  ): string {
    const filteredPackages = packages.filter(
      (pack) => !removePackages.includes(pack)
    );

    const removeFilters = removePackages
      .map((pack) => `--filter=!${pack}`)
      .join(" ");

    return filteredPackages.reduce((prev, curr) => {
      prev = prev + ` --filter=${curr}...`;
      return prev;
    }, `turbo run build ${removeFilters}`);
  }

  public execCommand(command: string): void {
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
