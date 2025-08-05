const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;
const RC_VERSION_REGEX = /^\d+\.\d+\.\d+-rc\.\d+$/;
const PACKAGE_NAME_REGEX =
  /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

function isBumpType(version: string): boolean {
  return ["major", "minor", "patch"].includes(version.toLowerCase());
}

function isValidSemanticVersion(version: string): boolean {
  // Semantic version format: major.minor.patch (e.g., 1.2.3)
  return SEMVER_REGEX.test(version);
}

function isValidRCVersion(version: string): boolean {
  // RC version format: major.minor.patch-rc.number (e.g., 1.2.3-rc.1)
  return RC_VERSION_REGEX.test(version);
}

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
