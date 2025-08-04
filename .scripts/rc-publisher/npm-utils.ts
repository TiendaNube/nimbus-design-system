import { execSync } from "child_process";

/**
 * Interface for NPM package version information
 */
export interface NpmPackageVersions {
  packageName: string;
  versions: string[];
}

/**
 * Options for publishing to NPM
 */
export interface NpmPublishOptions {
  access?: "public" | "restricted";
  tag?: string;
  otp?: string;
}

/**
 * Gets all published versions for a given package from NPM registry
 * @param packageName - The name of the package to check
 * @returns Array of published versions, or empty array if package doesn't exist
 */
export function getNpmPackageVersions(packageName: string): string[] {
  try {
    console.log(`🔍 Fetching published versions for ${packageName}...`);
    
    const npmInfo = execSync(
      `npm view ${packageName} versions --json`,
      {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"], // Suppress stderr
      }
    );

    const versions = JSON.parse(npmInfo);
    return Array.isArray(versions) ? versions : [versions];
  } catch (error) {
    console.log(`📋 No existing versions found for ${packageName}`);
    return [];
  }
}

/**
 * Finds the next available RC version for a given base version
 * @param packageName - The name of the package
 * @param baseVersion - The base version (e.g., "1.0.0")
 * @returns The next RC version (e.g., "1.0.0-rc.1" or "1.0.0-rc.3")
 */
export function getNextRCVersion(packageName: string, baseVersion: string): string {
  const versions = getNpmPackageVersions(packageName);
  const rcVersions = versions.filter((v) =>
    v.startsWith(`${baseVersion}-rc.`)
  );

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
 * @param packagePath - The path to the package directory
 * @param options - Publishing options (access, tag, OTP)
 */
export function publishToNpm(packagePath: string, options: NpmPublishOptions = {}): void {
  const {
    access = "public",
    tag = "rc",
    otp
  } = options;

  try {
    const accessFlag = `--access ${access}`;
    const tagFlag = `--tag ${tag}`;
    const otpFlag = otp ? ` --otp=${otp}` : "";
    
    const command = `npm publish ${accessFlag} ${tagFlag}${otpFlag}`;
    
    console.log(`📤 Publishing with command: ${command}`);
    
    execSync(command, {
      cwd: packagePath,
      stdio: "inherit",
    });
  } catch (error) {
    throw new Error(`npm publish failed: ${error.message}`);
  }
}

/**
 * Checks if a specific version exists on NPM
 * @param packageName - The name of the package
 * @param version - The version to check
 * @returns True if the version exists, false otherwise
 */
export function versionExistsOnNpm(packageName: string, version: string): boolean {
  const versions = getNpmPackageVersions(packageName);
  return versions.includes(version);
}

/**
 * Gets RC versions for a specific base version
 * @param packageName - The name of the package
 * @param baseVersion - The base version to check RCs for
 * @returns Array of RC versions for the base version
 */
export function getRCVersionsForBase(packageName: string, baseVersion: string): string[] {
  const versions = getNpmPackageVersions(packageName);
  return versions.filter((v) => v.startsWith(`${baseVersion}-rc.`));
}

/**
 * Validates if a version string is a valid RC version format
 * @param version - The version string to validate
 * @returns True if valid RC format, false otherwise
 */
export function isValidRCVersion(version: string): boolean {
  const rcPattern = /^\d+\.\d+\.\d+-rc\.\d+$/;
  return rcPattern.test(version);
}

/**
 * Extracts the base version from an RC version
 * @param rcVersion - The RC version (e.g., "1.0.0-rc.1")
 * @returns The base version (e.g., "1.0.0")
 */
export function getBaseVersionFromRC(rcVersion: string): string {
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
export function getRCNumber(rcVersion: string): number {
  const match = rcVersion.match(/-rc\.(\d+)$/);
  if (!match) {
    throw new Error(`Invalid RC version format: ${rcVersion}`);
  }
  return parseInt(match[1], 10);
}
