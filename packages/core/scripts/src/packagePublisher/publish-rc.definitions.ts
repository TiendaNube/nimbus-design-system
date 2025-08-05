function isBumpType(version: string): boolean {
  return ["major", "minor", "patch"].includes(version.toLowerCase());
}

function isValidSemanticVersion(version: string): boolean {
  // Semantic version format: major.minor.patch (e.g., 1.2.3)
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
}

function isValidRCVersion(version: string): boolean {
  // RC version format: major.minor.patch-rc.number (e.g., 1.2.3-rc.1)
  const rcVersionRegex = /^\d+\.\d+\.\d+-rc\.\d+$/;
  return rcVersionRegex.test(version);
}

export { isBumpType, isValidSemanticVersion, isValidRCVersion };
