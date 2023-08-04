import * as vscode from "vscode";
import fetch from "node-fetch";
import { PackageJSON, Dependencies, OutdatedDependencies } from "./types";

export class NimbusDependenciesChecker {
  async check() {
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Checking Nimbus Dependencies",
      },
      async () => {
        const nimbusDsDependencies =
          await this.getNimbusDependenciesFromPackage();

        const outdatedDependencies = await this.checkOutdatedNimbusDependencies(
          nimbusDsDependencies
        );
        this.showOutdatedDependenciesWarning(outdatedDependencies);
      }
    );
  }

  async getNimbusDependenciesFromPackage(): Promise<Dependencies> {
    const uri = vscode.workspace.workspaceFolders?.[0].uri;
    if (!uri) {
      return {};
    }

    const packageJSONUri = vscode.Uri.joinPath(uri, "package.json");
    const packageJSON = await this.getPackageJSON(packageJSONUri);

    if (!packageJSON) {
      return {};
    }

    const dependencies: Dependencies = {};
    const dependencyKeys = Object.keys(packageJSON.dependencies);

    dependencyKeys.reduce((acc, dependency) => {
      if (dependency.startsWith("@nimbus-ds")) {
        acc[dependency] = packageJSON.dependencies[dependency];
      }
      return acc;
    }, dependencies);

    return dependencies;
  }

  async getPackageJSON(
    packageJSONUri: vscode.Uri
  ): Promise<PackageJSON | null> {
    try {
      const packageJsonContent = await vscode.workspace.fs.readFile(
        packageJSONUri
      );
      return JSON.parse(packageJsonContent.toString());
    } catch (error) {
      console.log("Error reading package.json:", error);
      return null;
    }
  }

  async checkOutdatedNimbusDependencies(
    dependencies: Dependencies
  ): Promise<OutdatedDependencies[]> {
    const outdatedDependencies: OutdatedDependencies[] = [];

    const fetchPromises = Object.keys(dependencies).map(async (dependency) => {
      const currentVersion = dependencies[dependency].replace("^", "");
      const npmUrl = `https://registry.npmjs.org/${dependency}`;
      const response = await fetch(npmUrl);
      const data = await response.json();
      const latestVersion = data["dist-tags"].latest;

      if (currentVersion !== latestVersion) {
        return {
          [dependency]: { currentVersion, latestVersion },
        };
      }
      return null;
    });

    const results = await Promise.all(fetchPromises);

    results
      .filter((result) => result !== null)
      .forEach((result) =>
        outdatedDependencies.push(result as OutdatedDependencies)
      );

    return outdatedDependencies;
  }

  async showOutdatedDependenciesWarning(
    outdatedDependencies: OutdatedDependencies[]
  ): Promise<void> {
    await Promise.all(
      outdatedDependencies.map(async (outdatedDependency) => {
        const packageName = Object.keys(outdatedDependency)[0];
        const { latestVersion } = outdatedDependency[packageName];
        const { currentVersion } = outdatedDependency[packageName];
        await this.showOutdatedDependencyWarning(
          packageName,
          latestVersion,
          currentVersion
        );
      })
    );
  }

  async showOutdatedDependencyWarning(
    packageName: string,
    latestVersion: string,
    currentVersion: string
  ) {
    const message = `
    🚨 Outdated Nimbus dependency "${packageName}" found! ⚙️
    Current version in your project: ${currentVersion}  📦
    Latest version available: ${latestVersion}  🆕
    Time to update! 🚀
    Click "Check on npm" to see the latest version.`;

    const actionTitle = "Check on npm";
    const action = await vscode.window.showInformationMessage(
      message,
      actionTitle
    );

    if (action === actionTitle) {
      const npmUrl = `https://www.npmjs.com/package/${packageName}`;
      await vscode.env.openExternal(vscode.Uri.parse(npmUrl));
    }
  }
}
