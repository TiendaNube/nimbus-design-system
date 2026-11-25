import { execSync } from "child_process";
import type { NpmPublishOptions } from "./npm-utils.types";

/**
 * Gets all published versions for a given package from NPM registry
 * @param packageName - The name of the package to check
 * @returns Array of published versions, or empty array if package doesn't exist
 */
function getRemoteNpmPackageVersions(packageName: string): string[] {
  try {
    console.log(`🔍 Fetching published versions for ${packageName}...`);

    const npmInfo = execSync(`npm view ${packageName} versions --json`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"], // Suppress stderr
    });

    const versions = JSON.parse(npmInfo);
    return Array.isArray(versions) ? versions : [versions];
  } catch (error) {
    console.log(`📋 No existing versions found for ${packageName}`);
    return [];
  }
}

function getLocalNpmPackageVersions(packageName: string): string {
  const versionOutput = execSync(
    `npm pkg get version --workspace=${packageName}`,
    { encoding: "utf8" }
  );

  let version: string = "";

  // Try to parse the entire output as JSON (handles multi-line objects - like nimbus-ds)
  try {
    const parsedOutput = JSON.parse(versionOutput.trim());

    if (typeof parsedOutput === "string") {
      // Direct version string format: "1.0.0"
      version = parsedOutput;
    } else if (typeof parsedOutput === "object" && parsedOutput !== null) {
      // Object format: { "@nimbus-ds/package": "1.0.0" }
      version = parsedOutput[packageName];
    }
  } catch {
    // If parsing the entire output fails, try line-by-line parsing
    // This handles cases where npm returns multiple JSON outputs (like nimbus-ds)
    const lines = versionOutput
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    for (const line of lines) {
      try {
        const parsedLine = JSON.parse(line.trim());

        if (typeof parsedLine === "string") {
          // Direct version string format: "1.0.0"
          version = parsedLine;
          break;
        } else if (typeof parsedLine === "object" && parsedLine !== null) {
          // Object format: { "@nimbus-ds/package": "1.0.0" }
          if (parsedLine[packageName]) {
            version = parsedLine[packageName];
            break;
          }
        }
      } catch (jsonError) {
        // Skip invalid JSON lines and continue
        continue;
      }
    }
  }

  return version;
}

/**
 * Finds the next available RC version for a given base version
 * @param packageName - The name of the package
 * @param baseVersion - The base version (e.g., "1.0.0")
 * @returns The next RC version (e.g., "1.0.0-rc.1" or "1.0.0-rc.3")
 */
function getNextRCVersion(packageName: string, baseVersion: string): string {
  const versions = getRemoteNpmPackageVersions(packageName);
  const rcVersions = versions.filter((v) => v.startsWith(`${baseVersion}-rc.`));

  if (rcVersions.length === 0) {
    return `${baseVersion}-rc.1`;
  }

  // Find highest RC number
  const rcNumbers = rcVersions.map((v) => {
    const match = v.match(/-rc\.(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  });

  const highestRC = Math.max(...rcNumbers);
  const nextRC = `${baseVersion}-rc.${highestRC + 1}`;

  console.log(
    `📋 Found ${rcVersions.length} existing RC versions, next available: ${nextRC}`
  );

  return nextRC;
}

/**
 * Publishes a package to NPM with specified options
 * @param packageName - The name of the package workspace
 * @param options - Publishing options (access, tag, OTP)
 */
function publishToNpm(
  packageName: string,
  options: NpmPublishOptions = {}
): void {
  const { access = "public", tag = "rc", otp } = options;

  try {
    const accessFlag = `--access ${access}`;
    const tagFlag = `--tag ${tag}`;
    const otpFlag = otp ? ` --otp=${otp}` : "";

    const command = `yarn workspace ${packageName} npm publish ${accessFlag} ${tagFlag}${otpFlag}`;

    console.log(`📤 Publishing with command: ${command}`);

    execSync(command, {
      stdio: "inherit",
    });
  } catch (error: any) {
    throw new Error(`npm publish failed: ${error.message}`);
  }
}

/**
 * Checks if a specific version exists on NPM
 * @param packageName - The name of the package
 * @param version - The version to check
 * @returns True if the version exists, false otherwise
 */
function versionExistsOnNpm(packageName: string, version: string): boolean {
  const versions = getRemoteNpmPackageVersions(packageName);
  return versions.includes(version);
}

/**
 * Gets RC versions for a specific base version
 * @param packageName - The name of the package
 * @param baseVersion - The base version to check RCs for
 * @returns Array of RC versions for the base version
 */
function getRCVersionsForBase(
  packageName: string,
  baseVersion: string
): string[] {
  const versions = getRemoteNpmPackageVersions(packageName);
  return versions.filter((v) => v.startsWith(`${baseVersion}-rc.`));
}

/**
 * Validates if a version string is a valid RC version format
 * @param version - The version string to validate
 * @returns True if valid RC format, false otherwise
 */
function isValidRCVersion(version: string): boolean {
  const rcPattern = /^\d+\.\d+\.\d+-rc\.\d+$/;
  return rcPattern.test(version);
}

/**
 * Extracts the base version from an RC version
 * @param rcVersion - The RC version (e.g., "1.0.0-rc.1")
 * @returns The base version (e.g., "1.0.0")
 */
function getBaseVersionFromRC(rcVersion: string): string {
  const match = rcVersion.match(/^(\d+\.\d+\.\d+)-rc\.\d+$/);
  if (!match) {
    throw new Error(`Invalid RC version format: ${rcVersion}`);
  }
  return match[1];
}

/**
 * Extracts the RC number from an RC version
 * @param rcVersion - The RC version (e.g., "1.0.0-rc.1")
 * @returns The RC number (e.g., 1)
 */
function getRCNumber(rcVersion: string): number {
  const match = rcVersion.match(/-rc\.(\d+)$/);
  if (!match) {
    throw new Error(`Invalid RC version format: ${rcVersion}`);
  }
  return parseInt(match[1], 10);
}

function setLocalNpmPackageVersion(packageName: string, version: string): void {
  try {
    execSync(
      `npm version ${version} --workspace=${packageName} --no-git-tag-version`,
      {
        // This is useful to skip calling the 'yarn' command inside each package, as that will throw an error.
        stdio: "ignore",
      }
    );
  } catch (error) {
    // This is a known error, continue. The command was successful.
  }
}

function bumpVersion(
  major: number,
  minor: number,
  patch: number,
  bumpType: string
): string {
  switch (bumpType) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

/**
 * Compares two versions like "9.74.0" or "9.74.0-rc.2".
 * A stable version is greater than its own release candidates.
 */
function compareVersions(a: string, b: string): number {
  const [aBase, aRc] = a.split("-rc.");
  const [bBase, bRc] = b.split("-rc.");
  const aParts = aBase.split(".").map(Number);
  const bParts = bBase.split(".").map(Number);
  for (let i = 0; i < 3; i += 1) {
    if (aParts[i] !== bParts[i]) return aParts[i] - bParts[i];
  }
  const aNumber = aRc === undefined ? Infinity : Number(aRc);
  const bNumber = bRc === undefined ? Infinity : Number(bRc);
  if (aNumber === bNumber) return 0;
  return aNumber > bNumber ? 1 : -1;
}

/**
 * Finds the newest published release candidate of a package whose base
 * version is newer than `stableVersion` (an RC that is not released yet).
 * @returns The RC version (e.g., "9.74.0-rc.2"), or undefined if there is none
 */
function getLatestUnreleasedRCVersion(
  packageName: string,
  stableVersion: string
): string | undefined {
  return getRemoteNpmPackageVersions(packageName)
    .filter((v) => isValidRCVersion(v))
    .filter((v) => compareVersions(getBaseVersionFromRC(v), stableVersion) > 0)
    .sort(compareVersions)
    .pop();
}

/**
 * Reads a peer dependency range from a workspace package.json.
 * @returns The range, or an empty string if the peer is not declared
 */
function getLocalPeerDependency(
  packageName: string,
  dependencyName: string
): string {
  try {
    const output = execSync(
      `npm pkg get peerDependencies.${dependencyName} --workspace=${packageName}`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }
    );
    const parsed = JSON.parse(output.trim());
    const value =
      typeof parsed === "object" && parsed !== null
        ? parsed[packageName]
        : parsed;
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}

/** Writes a peer dependency range in a workspace package.json. */
function setLocalPeerDependency(
  packageName: string,
  dependencyName: string,
  range: string
): void {
  execSync(
    `npm pkg set "peerDependencies.${dependencyName}=${range}" --workspace=${packageName}`,
    { stdio: "ignore" }
  );
}

export {
  bumpVersion,
  compareVersions,
  getLatestUnreleasedRCVersion,
  getLocalPeerDependency,
  setLocalPeerDependency,
  getBaseVersionFromRC,
  getRCNumber,
  getRCVersionsForBase,
  getNextRCVersion,
  getRemoteNpmPackageVersions,
  getLocalNpmPackageVersions,
  isValidRCVersion,
  publishToNpm,
  versionExistsOnNpm,
  setLocalNpmPackageVersion,
};
