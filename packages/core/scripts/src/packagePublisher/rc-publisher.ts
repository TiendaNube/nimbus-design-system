import readline from "readline";
import {
  getNextRCVersion,
  publishToNpm,
  getBaseVersionFromRC,
  getLocalNpmPackageVersions,
  setLocalNpmPackageVersion,
  bumpVersion,
  getUnreleasedRCVersions,
  getLocalPeerDependency,
  versionExistsOnNpm,
  setLocalPeerDependency,
} from "./core/npm-utils/npm-utils";
import {
  isBumpType,
  isValidSemanticVersion,
  isValidRCVersion,
  isValidPackageName,
} from "./rc-publisher.definitions";
import { buildPackage, getYarnWorkspaces } from "./core/workspaces/workspaces";
import type { PackageInfo } from "./rc-publisher.types";
import { EXIT_CODES } from "../common/constants";

/**
 * Tool for publishing Release Candidate versions of Nimbus packages
 * Handles version calculation, building, and publishing to npm with rc tag
 */
const STYLES_PACKAGE = "@nimbus-ds/styles";

class RCPublisher {
  private _packageInfo: PackageInfo | null = null;
  /** Original `@nimbus-ds/styles` peer range, restored after publishing. */
  private originalStylesPeer?: string;
  /** `@nimbus-ds/styles` peer range to publish, when it is not the default. */
  private stylesPeerRange?: string;
  private skipBuild: boolean = false;
  private otp?: string;

  constructor() {
    // packageInfo will be set when findPackageByName is called
  }

  private get packageInfo(): PackageInfo {
    if (!this._packageInfo) {
      throw new Error(
        "Package info not initialized. Call findPackageByName first."
      );
    }
    return this._packageInfo;
  }

  private set packageInfo(value: PackageInfo) {
    this._packageInfo = value;
  }

  showHelp(): void {
    console.log(`🚀 Nimbus RC Publisher

Usage: yarn publish:rc <packageName> [version] [--skip-build] [--otp=123456] [--styles-rc=9.74.0-rc.2]

Parameters:
  packageName  (required) Name of package to publish (e.g., @nimbus-ds/button)
  
  version      (optional) Version to publish
               - Base version: 1.3.0 (must be major.minor.patch format, finds next RC slot: 1.3.0-rc.1)
               - Full RC: 1.3.0-rc.2 (must be major.minor.patch-rc.number format, publishes exact version)
               - Bump type: major, minor, or patch (calculates next version from base version)
               - If not provided, uses current version (if current is RC, extracts base version)

Examples:
  yarn publish:rc @nimbus-ds/button         # Specific package, use version files or current
  yarn publish:rc @nimbus-ds/button 1.3.0  # Specific package and version
  yarn publish:rc @nimbus-ds/button --otp=123456 --skip-build  # Combine flags
  yarn publish:rc @nimbus-ds/components --styles-rc=9.74.0-rc.2  # Pair with a styles RC

Options:
  -h, --help      Show this help message
  --skip-build    Skip the build process and publish package as-is
  --otp=123456    Provide 2FA one-time password for npm publish (6 digits from authenticator app)
  --styles-rc=9.74.0-rc.2
                  For packages with a workspace peer on @nimbus-ds/styles: publish the
                  peer as ^<this styles RC>, so the RC installs with it. Without it, the
                  only unreleased styles RC line is used; if there are several, the
                  publisher stops and asks for this option.

For more details, see scripts/README.md`);
  }

  validateArgs(argv: string[]): {
    packageName: string;
    version: string;
    otp?: string;
    skipBuild: boolean;
    showHelp: boolean;
    stylesRC?: string;
  } {
    // Parse arguments (filter out flags)
    const args = argv.slice(2).filter((arg) => !arg.startsWith("-"));
    const packageName = args[0];
    const version = args[1] || "";

    const otpArg = process.argv.find((arg) => arg.startsWith("--otp="));
    const otp = otpArg ? otpArg.split("=")[1] : undefined;
    const skipBuild = argv.includes("--skip-build");
    const stylesRCArg = argv.find((arg) => arg.startsWith("--styles-rc="));
    const stylesRC = stylesRCArg ? stylesRCArg.split("=")[1] : undefined;

    if (stylesRCArg !== undefined && !isValidRCVersion(stylesRC ?? "")) {
      throw new Error(
        `\n❌ Invalid --styles-rc: "${stylesRC}". Use a styles RC version (major.minor.patch-rc.number), e.g. --styles-rc=9.74.0-rc.2`
      );
    }
    const showHelp = argv.includes("--help") || argv.includes("-h");

    // Validate OTP parameter
    if (otp && (otp.length !== 6 || !/^\d{6}$/.test(otp))) {
      throw new Error(
        "\n❌ Invalid OTP format. Please provide exactly 6 digits (e.g., --otp=123456)"
      );
    }

    // Validate required package name
    if (!packageName || packageName.trim() === "") {
      throw new Error(
        "\n❌ Error: Package name is required. \n\n" +
          "Usage: yarn publish:rc <packageName> [version] [options] \n" +
          "Example: yarn publish:rc @nimbus-ds/button"
      );
    } else if (!isValidPackageName(packageName)) {
      throw new Error(
        `\n❌ Invalid package name: "${packageName}". Package name must follow the format @scope/package-name (e.g., @nimbus-ds/button)`
      );
    }

    return { packageName, version, otp, skipBuild, showHelp, stylesRC };
  }

  async run(
    packageName: string,
    version = "",
    skipBuild = false,
    otp?: string,
    stylesRC?: string
  ): Promise<void> {
    try {
      console.log("🚀 Nimbus RC Publisher");
      console.log("======================");
      console.log();

      // Check for skip-build flag
      this.skipBuild = skipBuild;
      this.otp = otp;

      // Find package to publish
      this.packageInfo = this.findPackageByName(packageName);
      console.log(`📦 Package: ${this.packageInfo.name}`);
      console.log(`📋 Current version: ${this.packageInfo.version}\n`);

      // Determine RC version to publish
      const rcVersion = await this.determineRCVersion(version);
      console.log(`🎯 Publishing version: ${rcVersion}\n`);

      // Decide the styles peer before building, so an ambiguous case stops early
      this.stylesPeerRange = this.resolveStylesPeerRange(stylesRC);
      if (this.stylesPeerRange) {
        console.log(
          `🔗 ${STYLES_PACKAGE} peer range: ${this.stylesPeerRange}\n`
        );
      }

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
        `\n📥 Install with: yarn add ${this.packageInfo.name}@${rcVersion}`
      );
    } catch (error) {
      console.error(
        "\n💥 Publishing failed:",
        error instanceof Error ? error.message : String(error)
      );
      await this.cleanup();
      // Nothing was published: fail the command so CI does not report success
      process.exitCode = EXIT_CODES.FAILURE;
    }
  }

  findPackageByName(packageName: string): PackageInfo {
    // Get all workspaces using yarn
    const workspaces = getYarnWorkspaces();

    const workspace = workspaces.find((ws) => ws.name === packageName);
    if (!workspace)
      throw new Error(`Package "${packageName}" not found in workspace`);

    try {
      const version = getLocalNpmPackageVersions(packageName);

      if (!version) {
        throw new Error(`Version not found for package "${packageName}"`);
      }

      return {
        name: workspace.name,
        version,
      };
    } catch (error) {
      throw new Error(
        `Error getting version for package "${packageName}": ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async determineRCVersion(versionArg: string): Promise<string> {
    if (versionArg && versionArg.trim() !== "") {
      // Version specified by user
      const version = versionArg.trim();

      if (version.includes("-rc.")) {
        // Complete RC version provided - validate format and use as-is
        if (!isValidRCVersion(version)) {
          throw new Error(
            `\n❌ Invalid RC version format: "${version}". RC version must follow semantic versioning format (major.minor.patch-rc.number)\n` +
              `   Examples: 6.1.1-rc.1, 6.0.0-rc.2, 1.2.3-rc.5\n` +
              `   Invalid: "6-rc.1", "6.5-rc.1", "1.2-rc.1"`
          );
        }
        return version;
      } else if (isBumpType(version)) {
        // Bump type provided (major/minor/patch) - calculate next version
        const nextVersion = this.calculateNextVersion(
          this.packageInfo.version,
          version.toLowerCase()
        );
        return getNextRCVersion(this.packageInfo.name, nextVersion);
      } else {
        // Base version provided - validate format and find next RC slot
        if (!isValidSemanticVersion(version)) {
          throw new Error(
            `\n❌ Invalid version format: "${version}". Version must follow semantic versioning format (major.minor.patch)\n` +
              `   Examples: 6.1.1, 6.0.0, 1.2.3\n` +
              `   Invalid: "6", "6.5", "1.2"`
          );
        }
        return getNextRCVersion(this.packageInfo.name, version);
      }
    } else {
      // No version provided - use current version, but extract base version if it's already an RC
      let baseVersion = this.packageInfo.version;

      // If current version is already an RC, extract the base version
      if (baseVersion.includes("-rc.")) {
        if (!isValidRCVersion(baseVersion)) {
          throw new Error(
            `\n❌ Invalid current RC version format: "${baseVersion}". RC version must follow semantic versioning format (major.minor.patch-rc.number)`
          );
        }
        baseVersion = getBaseVersionFromRC(baseVersion);
        console.log(
          `🔄 Current version is RC, using base version: ${baseVersion}`
        );
      }

      return getNextRCVersion(this.packageInfo.name, baseVersion);
    }
  }

  calculateNextVersion(currentVersion: string, bumpType: string): string {
    // If current version is an RC, extract the base version for calculation
    let baseVersion = currentVersion;
    if (currentVersion.includes("-rc.")) {
      if (!isValidRCVersion(currentVersion)) {
        throw new Error(
          `\n❌ Invalid current RC version format: "${currentVersion}". RC version must follow semantic versioning format (major.minor.patch-rc.number)\n` +
            `   Examples: 6.1.1-rc.1, 6.0.0-rc.2, 1.2.3-rc.5\n` +
            `   Invalid: "6-rc.1", "6.5-rc.1", "1.2-rc.1"`
        );
      }
      baseVersion = getBaseVersionFromRC(currentVersion);
      console.log(
        `🔄 Current version is RC, using base version for calculation: ${baseVersion}`
      );
    }

    const [major, minor, patch] = baseVersion.split(".").map(Number);

    if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
      throw new Error(`Invalid version format: ${baseVersion}`);
    }
    console.log(`   Latest npm published version: ${currentVersion}`);
    console.log(`   Local version: ${baseVersion}`);
    console.log(`   Bump type: ${bumpType}`);

    const nextVersion = bumpVersion(major, minor, patch, bumpType);

    console.log(`   Calculated: ${nextVersion}`);
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
      buildPackage(this.packageInfo.name);
    }

    console.log("📝 Updating package.json version...");
    setLocalNpmPackageVersion(this.packageInfo.name, rcVersion);
    this.applyStylesPeerRange();

    console.log("📤 Publishing to npm...");
    publishToNpm(this.packageInfo.name, {
      access: "public",
      tag: "rc",
      otp,
    });

    await this.cleanup();
  }

  /**
   * A `workspace:^` peer on `@nimbus-ds/styles` is published as `^<local
   * styles version>`, which no styles RC satisfies (semver skips
   * prereleases of other versions). For an RC, the peer is published as
   * `^<styles RC>` instead: the one passed with `--styles-rc`, or, when all
   * unreleased styles RCs share one version, the first RC of that version
   * (so every RC of it and the stable release satisfy the range). Several
   * unreleased versions are ambiguous, so the publisher stops and asks.
   * Regular releases keep `workspace:^`.
   * @returns The range to publish, or undefined to keep the declared peer
   */
  resolveStylesPeerRange(stylesRC?: string): string | undefined {
    const peer = getLocalPeerDependency(this.packageInfo.name, STYLES_PACKAGE);
    if (!peer.startsWith("workspace:")) {
      if (stylesRC) {
        console.log(
          `⚠️  --styles-rc ignored: ${this.packageInfo.name} has no workspace peer on ${STYLES_PACKAGE}`
        );
      }
      return undefined;
    }

    if (stylesRC) {
      if (!versionExistsOnNpm(STYLES_PACKAGE, stylesRC)) {
        throw new Error(
          `\n❌ ${STYLES_PACKAGE}@${stylesRC} is not published. Publish that styles RC first or pass another --styles-rc.`
        );
      }
      return `^${stylesRC}`;
    }

    const stylesVersion = getLocalNpmPackageVersions(STYLES_PACKAGE);
    const unreleased = getUnreleasedRCVersions(STYLES_PACKAGE, stylesVersion);
    if (unreleased.length === 0) return undefined;

    const baseVersions = Array.from(
      new Set(unreleased.map((v) => getBaseVersionFromRC(v)))
    );
    if (baseVersions.length > 1) {
      throw new Error(
        `\n❌ There are unreleased ${STYLES_PACKAGE} RCs for several versions (${unreleased.join(
          ", "
        )}). Pass the one this RC needs, e.g. --styles-rc=${unreleased[0]}`
      );
    }
    return `^${unreleased[0]}`;
  }

  /** Publishes the resolved styles peer range; `cleanup` restores it. */
  applyStylesPeerRange(): void {
    if (!this.stylesPeerRange) return;
    this.originalStylesPeer = getLocalPeerDependency(
      this.packageInfo.name,
      STYLES_PACKAGE
    );
    setLocalPeerDependency(
      this.packageInfo.name,
      STYLES_PACKAGE,
      this.stylesPeerRange
    );
  }

  async cleanup(): Promise<void> {
    if (this._packageInfo?.name && this.originalStylesPeer) {
      console.log(`🔄 Restoring original ${STYLES_PACKAGE} peer range...`);
      setLocalPeerDependency(
        this._packageInfo.name,
        STYLES_PACKAGE,
        this.originalStylesPeer
      );
      this.originalStylesPeer = undefined;
    }
    if (this._packageInfo?.name && this._packageInfo?.version) {
      console.log("🔄 Restoring original package.json version...");
      setLocalNpmPackageVersion(
        this._packageInfo.name,
        this._packageInfo.version
      );
    }
  }
}

export { RCPublisher };
