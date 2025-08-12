const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;
const RC_VERSION_REGEX = /^\d+\.\d+\.\d+-rc\.\d+$/;
const PACKAGE_NAME_REGEX =
  /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

/**
 * Checks if the provided string is a valid version bump type
 * @param version - The version string to check
 * @returns true if version is "major", "minor", or "patch" (case-insensitive)
 */
function isBumpType(version: string): boolean {
  return ["major", "minor", "patch"].includes(version.toLowerCase());
}

/**
 * Validates if the provided string follows semantic versioning format
 * @param version - The version string to validate
 * @returns true if version matches major.minor.patch format (e.g., 1.2.3)
 */
function isValidSemanticVersion(version: string): boolean {
  // Semantic version format: major.minor.patch (e.g., 1.2.3)
  return SEMVER_REGEX.test(version);
}

/**
 * Validates if the provided string is a valid RC version
 * @param version - The version string to validate
 * @returns true if version matches major.minor.patch-rc.number format (e.g., 1.2.3-rc.1)
 */
function isValidRCVersion(version: string): boolean {
  // RC version format: major.minor.patch-rc.number (e.g., 1.2.3-rc.1)
  return RC_VERSION_REGEX.test(version);
}

/**
 * Validates if the provided string is a valid npm package name
 * @param packageName - The package name to validate
 * @returns true if package name follows npm naming conventions (e.g., @nimbus-ds/button)
 */
function isValidPackageName(packageName: string): boolean {
  // Package name format: @scope/package-name (e.g., @nimbus-ds/button)
  return PACKAGE_NAME_REGEX.test(packageName);
}

export {
  isBumpType,
  isValidSemanticVersion,
  isValidRCVersion,
  isValidPackageName,
};
