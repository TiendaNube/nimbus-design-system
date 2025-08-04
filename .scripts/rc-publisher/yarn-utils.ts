import fs from "fs";
import path from "path";

/**
 * Gets the bump type from yarn version files for a specific package
 * @param packageName - The name of the package to look for
 * @returns The bump type (major, minor, patch) or null if not found
 */
export function getBumpTypeFromYarnVersions(
  packageName: string
): string | null {
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

        console.log(`🔍 Checking ${file} for package ${packageName}...`);

        // Parse YAML structure properly
        const bumpType = parseYarnVersionFile(content, packageName);
        if (bumpType) {
          console.log(`✅ Found package reference in ${file}`);
          console.log(`🎯 Detected bump type: ${bumpType}`);
          return bumpType;
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

/**
 * Parses a yarn version file content to find bump type for a specific package
 * @param content - The YAML content of the version file
 * @param packageName - The name of the package to look for
 * @returns The bump type (major, minor, patch) or null if not found
 */
export function parseYarnVersionFile(
  content: string,
  packageName: string
): string | null {
  try {
    const lines = content.split("\n");
    let inReleasesSection = false;
    let inDeclinedSection = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check section headers
      if (trimmedLine === "releases:") {
        inReleasesSection = true;
        inDeclinedSection = false;
        continue;
      }

      if (trimmedLine === "declined:") {
        inReleasesSection = false;
        inDeclinedSection = true;
        continue;
      }

      // If we're in releases section, look for package mapping
      if (inReleasesSection && trimmedLine.includes(":")) {
        const match = trimmedLine.match(/^["']?([^"':]+)["']?\s*:\s*(\w+)/);
        if (match) {
          const [, pkg, bumpType] = match;
          if (pkg === packageName) {
            if (["major", "minor", "patch"].includes(bumpType)) {
              return bumpType;
            }
          }
        }
      }

      // If we're in declined section, check if package is declined
      if (inDeclinedSection && trimmedLine.startsWith("- ")) {
        const pkg = trimmedLine.substring(2).trim();
        if (pkg === packageName) {
          console.log(`⚠️  Package ${packageName} is in declined section`);
          return null;
        }
      }

      // If we hit a line that doesn't start with spaces or dash, we're out of current section
      if (
        trimmedLine &&
        !trimmedLine.startsWith("-") &&
        !line.startsWith(" ") &&
        !line.startsWith("\t")
      ) {
        inReleasesSection = false;
        inDeclinedSection = false;
      }
    }
  } catch (error) {
    console.log(`⚠️  Error parsing YAML content: ${error.message}`);
  }

  return null;
}
