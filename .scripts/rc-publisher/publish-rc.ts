#!/usr/bin/env node

/**
 * Local Release Candidate Publisher
 *
 * Usage: yarn publish:rc [packageName] [version] [--skip-build] [--otp=123456]
 *
 * Examples:
 *   yarn publish:rc                           # Publish RC for current directory package
 *   yarn publish:rc @nimbus-ds/button         # Publish RC for specific package
 *   yarn publish:rc @nimbus-ds/button 1.3.0  # Publish specific version as RC
 *   yarn publish:rc "" 1.3.0                  # Publish current directory package with specific version
 *   yarn publish:rc --skip-build              # Skip build and publish current package as-is
 *   yarn publish:rc @nimbus-ds/button --skip-build  # Skip build for specific package
 *   yarn publish:rc --otp=123456              # Publish with 2FA OTP code
 *   yarn publish:rc @nimbus-ds/button --otp=123456 --skip-build  # Combine flags
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";
import { getNextRCVersion, publishToNpm } from "./npm-utils";

interface PackageInfo {
  name: string;
  version: string;
  path: string;
}

class LocalRCPublisher {
  private packageInfo: PackageInfo;
  private originalPackageJson: string;
  private skipBuild: boolean = false;
  private otp?: string;

  showHelp(): void {
    console.log(`🚀 Nimbus RC Publisher

Usage: yarn publish:rc [packageName] [version] [--skip-build] [--otp=123456]

Parameters:
  packageName  (optional) Name of package to publish (e.g., @nimbus-ds/button)
               If not provided, detects from current directory
  
  version      (optional) Version to publish
               - Base version: 1.3.0 (finds next RC slot: 1.3.0-rc.1)
               - Full RC: 1.3.0-rc.2 (publishes exact version)
               - If not provided, uses yarn version files or current version

Examples:
  yarn publish:rc                           # Auto-detect package, use version files or current
  yarn publish:rc @nimbus-ds/button         # Specific package, use version files or current
  yarn publish:rc @nimbus-ds/button 1.3.0  # Specific package and version
  yarn publish:rc "" 1.3.0                  # Current dir package, specific version
  yarn publish:rc --otp=123456              # Publish with 2FA OTP code

Options:
  -h, --help      Show this help message
  --skip-build    Skip the build process and publish package as-is
  --otp=123456    Provide 2FA one-time password for npm publish (6 digits from authenticator app)

For more details, see scripts/README.md`);
  }

  async run(): Promise<void> {
    try {
      // Check for help flag
      if (process.argv.includes("--help") || process.argv.includes("-h")) {
        this.showHelp();
        return;
      }

      // Check for skip-build flag
      this.skipBuild = process.argv.includes("--skip-build");

      // Check for OTP parameter
      const otpArg = process.argv.find((arg) => arg.startsWith("--otp="));
      if (otpArg) {
        this.otp = otpArg.split("=")[1];
        if (!this.otp || this.otp.length !== 6 || !/^\d{6}$/.test(this.otp)) {
          console.error(
            "❌ Invalid OTP format. Please provide exactly 6 digits (e.g., --otp=123456)"
          );
          return;
        }
      }

      console.log("🚀 Nimbus RC Publisher");
      console.log("======================");
      console.log();

      // Parse arguments (filter out flags)
      const args = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
      const packageName = args[0] || "";
      const versionArg = args[1] || "";

      // Find package to publish
      this.packageInfo = await this.findPackage(packageName);
      console.log(`📦 Package: ${this.packageInfo.name}`);
      console.log(`📁 Path: ${this.packageInfo.path}`);
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
    } catch (error) {
      console.error("\n💥 Publishing failed:", error.message);
      await this.cleanup();
      process.exit(1);
    }
  }

  async findPackage(packageName: string): Promise<PackageInfo> {
    if (packageName && packageName.trim() !== "") {
      // Find package by name in workspace
      const found = this.findPackageByName(packageName);
      if (!found) {
        throw new Error(`Package "${packageName}" not found in workspace`);
      }
      return found;
    } else {
      // Find package from current directory
      return this.findPackageFromCurrentDir();
    }
  }

  findPackageByName(packageName: string): PackageInfo | null {
    const searchPaths = [
      "packages/core",
      "packages/icons",
      "packages/helper",
      "packages/react/src/atomic",
      "packages/react/src/composite",
    ];

    // Search in component directories
    for (const searchPath of searchPaths) {
      if (!fs.existsSync(searchPath)) continue;

      try {
        const dirs = fs.readdirSync(searchPath, { withFileTypes: true });
        for (const dir of dirs) {
          if (dir.isDirectory()) {
            const packageJsonPath = path.join(
              searchPath,
              dir.name,
              "package.json"
            );
            if (fs.existsSync(packageJsonPath)) {
              const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
              if (pkg.name === packageName) {
                return {
                  name: pkg.name,
                  version: pkg.version,
                  path: path.join(searchPath, dir.name),
                };
              }
            }
          }
        }
      } catch (error) {
        // Continue searching
      }
    }

    // Search in root package directories
    const rootPackages = [
      "packages/react",
      "packages/icons",
      "packages/core/styles",
      "packages/core/tokens",
      "packages/core/typings",
      "packages/core/webpack",
    ];

    for (const pkgPath of rootPackages) {
      const packageJsonPath = path.join(pkgPath, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
        if (pkg.name === packageName) {
          return {
            name: pkg.name,
            version: pkg.version,
            path: pkgPath,
          };
        }
      }
    }

    return null;
  }

  findPackageFromCurrentDir(): PackageInfo {
    // Use INIT_CWD if available (set by yarn), otherwise use process.cwd()
    const originalDir = process.env.INIT_CWD || process.cwd();
    let currentDir = originalDir;
    const rootDir = path.resolve(".");

    // Walk up directory tree looking for package.json
    while (currentDir.startsWith(rootDir)) {
      const packageJsonPath = path.join(currentDir, "package.json");

      if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

        // Skip if it's the root package or doesn't have a scoped name
        if (
          pkg.name &&
          pkg.name.startsWith("@nimbus-ds/") &&
          currentDir !== rootDir
        ) {
          const relativePath = path.relative(rootDir, currentDir) || ".";
          return {
            name: pkg.name,
            version: pkg.version,
            path: relativePath,
          };
        }
      }

      // Move up one directory
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) break; // Reached filesystem root
      currentDir = parentDir;
    }

    throw new Error(
      "No publishable package found in current directory tree. Make sure you're in a package directory or specify the package name."
    );
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
      const bumpType = this.getBumpTypeFromYarnVersions();
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

  getBumpTypeFromYarnVersions(): string | null {
    // Look for yarn version files that might indicate bump type
    const versionFilesDir = ".yarn/versions";

    console.log(
      `🔍 Checking for yarn version files in: ${path.resolve(versionFilesDir)}`
    );

    if (!fs.existsSync(versionFilesDir)) {
      console.log(
        "⚠️  No yarn version files found, using current version for RC"
      );
      return null;
    }

    try {
      const versionFiles = fs.readdirSync(versionFilesDir);
      console.log(
        `📁 Found ${versionFiles.length} version files: ${versionFiles.join(
          ", "
        )}`
      );

      for (const file of versionFiles) {
        if (file.endsWith(".yml") || file.endsWith(".yaml")) {
          const filePath = path.join(versionFilesDir, file);
          const content = fs.readFileSync(filePath, "utf8");

          console.log(
            `🔍 Checking ${file} for package ${this.packageInfo.name}...`
          );

          // Simple parsing - look for package name and bump type
          if (content.includes(this.packageInfo.name)) {
            console.log(`✅ Found package reference in ${file}`);
            if (content.includes("major")) {
              console.log("🎯 Detected bump type: major");
              return "major";
            }
            if (content.includes("minor")) {
              console.log("🎯 Detected bump type: minor");
              return "minor";
            }
            if (content.includes("patch")) {
              console.log("🎯 Detected bump type: patch");
              return "patch";
            }
          }
        }
      }

      console.log(
        "⚠️  Package not found in version files, using current version for RC"
      );
    } catch (error) {
      console.log(
        "⚠️  Could not read yarn version files, using current version for RC"
      );
      console.log(`   Error: ${error.message}`);
    }

    return null;
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
      console.log("\n🔨 Building package...");
      await this.buildPackage();
    }

    console.log("📝 Updating package.json version...");
    await this.updatePackageVersion(rcVersion);

    console.log("📤 Publishing to npm...");
    publishToNpm(this.packageInfo.path, {
      access: "public",
      tag: "rc",
      otp,
    });

    console.log("🔄 Restoring original package.json...");
    await this.cleanup();
  }

  async buildPackage(): Promise<void> {
    const packagePath = this.packageInfo.path;

    try {
      // Try package-specific build first
      execSync("npm run build", {
        cwd: packagePath,
        stdio: "inherit",
      });
    } catch (error) {
      // Fallback to workspace build
      console.log("📦 Running workspace build...");
      execSync(`yarn workspace ${this.packageInfo.name} build`, { stdio: "inherit" });
    }
  }

  async updatePackageVersion(rcVersion: string): Promise<void> {
    const packageJsonPath = path.join(this.packageInfo.path, "package.json");

    // Backup original
    this.originalPackageJson = fs.readFileSync(packageJsonPath, "utf8");

    // Update version
    const packageJson = JSON.parse(this.originalPackageJson);
    packageJson.version = rcVersion;

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n"
    );
  }

  async cleanup() {
    if (this.originalPackageJson && this.packageInfo) {
      const packageJsonPath = path.join(this.packageInfo.path, "package.json");
      fs.writeFileSync(packageJsonPath, this.originalPackageJson);
      console.log("✅ Package.json restored to original version");
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
