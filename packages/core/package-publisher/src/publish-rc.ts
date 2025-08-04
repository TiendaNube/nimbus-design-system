#!/usr/bin/env node

/**
 * Local Release Candidate Publisher
 *
 * Usage: yarn publish:rc <packageName> [version] [--skip-build] [--otp=123456]
 *
 * Examples:
 *   yarn publish:rc @nimbus-ds/button         # Publish RC for specific package
 *   yarn publish:rc @nimbus-ds/button 1.3.0  # Publish specific version as RC
 *   yarn publish:rc @nimbus-ds/button --skip-build  # Skip build for specific package
 *   yarn publish:rc @nimbus-ds/button --otp=123456 --skip-build  # Combine flags
 */

import { execSync } from "child_process";
import readline from "readline";
import { getNextRCVersion, publishToNpm } from "./npm-utils";
import { getBumpTypeFromYarnVersions } from "./yarn-utils";

interface PackageInfo {
  name: string;
  version: string;
  location: string;
}

class LocalRCPublisher {
  private packageInfo: PackageInfo;
  private originalVersion: string = "";
  private skipBuild: boolean = false;
  private otp?: string;

  constructor() {
    this.packageInfo = {} as PackageInfo;
  }

  showHelp(): void {
    console.log(`🚀 Nimbus RC Publisher

Usage: yarn publish:rc <packageName> [version] [--skip-build] [--otp=123456]

Parameters:
  packageName  (required) Name of package to publish (e.g., @nimbus-ds/button)
  
  version      (optional) Version to publish
               - Base version: 1.3.0 (finds next RC slot: 1.3.0-rc.1)
               - Full RC: 1.3.0-rc.2 (publishes exact version)
               - If not provided, uses yarn version files or current version

Examples:
  yarn publish:rc @nimbus-ds/button         # Specific package, use version files or current
  yarn publish:rc @nimbus-ds/button 1.3.0  # Specific package and version
  yarn publish:rc @nimbus-ds/button --otp=123456 --skip-build  # Combine flags

Options:
  -h, --help      Show this help message
  --skip-build    Skip the build process and publish package as-is
  --otp=123456    Provide 2FA one-time password for npm publish (6 digits from authenticator app)

For more details, see scripts/README.md`);
  }

  validateArgs(): void {
    // Check for help flag
    if (process.argv.includes("--help") || process.argv.includes("-h")) {
      return this.showHelp();
    }

    // Validate OTP parameter
    const otpArg = process.argv.find((arg) => arg.startsWith("--otp="));
    if (otpArg) {
      this.otp = otpArg.split("=")[1];
      if (!this.otp || this.otp.length !== 6 || !/^\d{6}$/.test(this.otp)) {
        throw new Error(
          "\n❌ Invalid OTP format. Please provide exactly 6 digits (e.g., --otp=123456)"
        );
      }
    }

    // Validate required package name
    const args = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
    const packageName = args[0];
    if (!packageName || packageName.trim() === "") {
      throw new Error(
        "\n❌ Error: Package name is required. \n\nUsage: yarn publish:rc <packageName> [version] [options] \nExample: yarn publish:rc @nimbus-ds/button"
      );
    }
  }

// Removed findProjectRoot() - yarn workspace commands work from any directory

  async run(): Promise<void> {
    try {
      console.log("🚀 Nimbus RC Publisher");
      console.log("======================");
      console.log();

      this.validateArgs();

      // Parse arguments (filter out flags)
      const args = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
      const packageName = args[0];
      const versionArg = args[1] || "";

      // Check for skip-build flag
      this.skipBuild = process.argv.includes("--skip-build");

      // Find package to publish
      this.packageInfo = this.findPackageByName(packageName);
      console.log(`📦 Package: ${this.packageInfo.name}`);
      console.log(`📁 Location: ${this.packageInfo.location}`);
      console.log(`📋 Current version: ${this.packageInfo.version}\n`);

      // Determine RC version to publish
      const rcVersion = await this.determineRCVersion(versionArg);
      console.log(`🎯 Publishing version: ${rcVersion}\n`);

      // Confirm with user
      const confirmed = await this.confirmPublish(rcVersion);
      if (!confirmed) {
        console.log("❌ Publishing cancelled by user");
        return;
      }

      // Execute publishing process
      await this.publishRC(rcVersion, this.otp);

      console.log(
        `\n✅ Successfully published ${this.packageInfo.name}@${rcVersion}`
      );
      console.log(
        `\n📥 Install with: npm install ${this.packageInfo.name}@${rcVersion}`
      );
    } catch (error: any) {
      console.error("\n💥 Publishing failed:", error.message);
      await this.cleanup();
      process.exit(1);
    }
  }

  findPackageByName(packageName: string): PackageInfo {
    try {
      // Get all workspaces using yarn
      const workspacesOutput = execSync("yarn workspaces list --json", {
        encoding: "utf8",
      });

      const workspaces = workspacesOutput
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => JSON.parse(line));

      const workspace = workspaces.find((ws) => ws.name === packageName);
      if (!workspace)
        throw new Error(`Package "${packageName}" not found in workspace`);

      // Get version using npm pkg command (no need to read package.json file)
      const versionOutput = execSync(
        `npm pkg get version --workspace=${packageName}`,
        { encoding: "utf8" }
      );
      
      // Parse version from first line of output (removes quotes)
      const firstLine = versionOutput.split('\n')[0].trim();
      const version = JSON.parse(firstLine);

      return {
        name: workspace.name,
        version,
        location: workspace.location,
      };
    } catch (error) {
      throw new Error(
        `Couldn't find package ${packageName} in workspace. Error: ${error}`
      );
    }
  }

  async determineRCVersion(versionArg: string): Promise<string> {
    if (versionArg && versionArg.trim() !== "") {
      // Version specified by user
      const version = versionArg.trim();

      if (version.includes("-rc.")) {
        // Complete RC version provided - use as-is
        return version;
      } else {
        // Base version provided - find next RC slot
        return getNextRCVersion(this.packageInfo.name, version);
      }
    } else {
      // No version specified - determine from yarn version files
      const bumpType = getBumpTypeFromYarnVersions(this.packageInfo.name);
      if (bumpType === null) {
        // No version files found or package not in version files - use current version
        return getNextRCVersion(
          this.packageInfo.name,
          this.packageInfo.version
        );
      } else {
        // Version files found with bump type - calculate next version
        const baseVersion = this.calculateNextVersion(
          this.packageInfo.version,
          bumpType
        );
        return getNextRCVersion(this.packageInfo.name, baseVersion);
      }
    }
  }

  calculateNextVersion(currentVersion: string, bumpType: string): string {
    const [major, minor, patch] = currentVersion.split(".").map(Number);

    console.log(`🧮 Version calculation:`);
    console.log(`   Current: ${currentVersion} (${major}.${minor}.${patch})`);
    console.log(`   Bump: ${bumpType}`);

    let nextVersion: string;
    switch (bumpType) {
      case "major":
        nextVersion = `${major + 1}.0.0`;
        break;
      case "minor":
        nextVersion = `${major}.${minor + 1}.0`;
        break;
      case "patch":
      default:
        nextVersion = `${major}.${minor}.${patch + 1}`;
        break;
    }

    console.log(`   Next: ${nextVersion}`);
    return nextVersion;
  }

  async confirmPublish(rcVersion: string): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(
        `\n❓ Publish ${this.packageInfo.name}@${rcVersion}? (y/N): `,
        (answer) => {
          rl.close();
          resolve(answer.toLowerCase().startsWith("y"));
        }
      );
    });
  }

  async publishRC(rcVersion: string, otp?: string): Promise<void> {
    if (this.skipBuild) {
      console.log("\n⚡ Skipping build process (--skip-build flag detected)");
    } else {
      console.log("🔨 Building package...");
      execSync(`yarn workspace ${this.packageInfo.name} build`, {
        stdio: "inherit",
      });
    }

    console.log("📝 Updating package.json version...");
    this.updatePackageVersion(rcVersion);

    console.log("📤 Publishing to npm...");
    publishToNpm(this.packageInfo.name, {
      access: "public",
      tag: "rc",
      otp,
    });

    console.log("🔄 Restoring original package.json version...");
    await this.cleanup();
  }

  updatePackageVersion(rcVersion: string): void {
    // Store original version for cleanup
    this.originalVersion = this.packageInfo.version;
    
    try {
      execSync(`npm version ${rcVersion} --workspace=${this.packageInfo.name} --no-git-tag-version`, {
        stdio: "inherit",
      });
    } catch (error) {
      throw new Error(`Failed to update package version: ${error}`);
    }
  }

  async cleanup(): Promise<void> {
    if (this.originalVersion && this.packageInfo.name) {
      try {
        execSync(`npm version ${this.originalVersion} --workspace=${this.packageInfo.name} --no-git-tag-version`, {
          stdio: "inherit",
        });
        console.log(`✅ Package.json version restored to ${this.originalVersion}`);
      } catch (error) {
        console.warn(`⚠️  Failed to restore original version: ${error}`);
      }
    }
  }


}

// Main execution
async function main() {
  const publisher = new LocalRCPublisher();

  // Handle graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\n\n⚠️  Publishing interrupted by user");
    await publisher.cleanup();
    process.exit(130);
  });

  process.on("SIGTERM", async () => {
    console.log("\n\n⚠️  Publishing terminated");
    await publisher.cleanup();
    process.exit(143);
  });

  await publisher.run();
}

if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Unexpected error:", error);
    process.exit(1);
  });
}

module.exports = { LocalRCPublisher };
