import fs from "fs";
import { execSync } from "child_process";

/* eslint no-console: "off" */
export class PackageBuilder {
  public getPackagesToBuild(path: string): string[] {
    const content = this.getContentVersions(path);
    return this.processVersions(content);
  }

  private processVersions(content: string) {
    const regex = /^ {2}"?([^":]+)"?:/gm;
    return Array.from(content.matchAll(regex), (match) =>
      match[1].replace(/"/g, "")
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
