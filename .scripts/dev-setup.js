#!/usr/bin/env node

/**
 * Development Setup Script
 *
 * Automatically builds foundational packages if they don't exist.
 * This ensures a smooth development experience for new contributors.
 */

const { existsSync } = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const foundationalPackages = [
  {
    name: "@nimbus-ds/tokens",
    distPath: "packages/core/tokens/dist",
    buildCommand: "yarn build:tokens",
    description: "Design tokens (colors, spacing, typography, etc.)",
  },
  {
    name: "@nimbus-ds/icons",
    distPath: "packages/icons/dist",
    buildCommand: "yarn build:icons",
    description: "Icon components and SVG assets",
  },
];

function checkAndBuildFoundationalPackages() {
  console.log("🔍 Checking foundational packages...\n");

  const packagesToBuild = [];

  // Check which packages need building
  foundationalPackages.forEach((pkg) => {
    const distExists = existsSync(path.join(process.cwd(), pkg.distPath));
    if (!distExists) {
      packagesToBuild.push(pkg);
      console.log(`❌ ${pkg.name}: Missing dist folder`);
    } else {
      console.log(`✅ ${pkg.name}: Already built`);
    }
  });

  // Build missing packages
  if (packagesToBuild.length > 0) {
    console.log(
      `\n🔨 Building ${packagesToBuild.length} foundational package(s)...\n`
    );

    packagesToBuild.forEach((pkg) => {
      console.log(`⚙️  Building ${pkg.name} (${pkg.description})...`);
      try {
        execSync(pkg.buildCommand, { stdio: "inherit", cwd: process.cwd() });
        console.log(`✅ ${pkg.name} built successfully\n`);
      } catch (error) {
        console.error(`❌ Failed to build ${pkg.name}:`, error.message);
        process.exit(1);
      }
    });

    console.log("🎉 All foundational packages are ready!\n");
  } else {
    console.log("\n✨ All foundational packages are already built!\n");
  }
}

function startStorybook() {
  console.log("🚀 Starting Storybook development server...\n");
  try {
    execSync("storybook dev -p 6006", { stdio: "inherit", cwd: process.cwd() });
  } catch (error) {
    console.error("❌ Failed to start Storybook:", error.message);
    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  checkAndBuildFoundationalPackages();
  startStorybook();
}

module.exports = { checkAndBuildFoundationalPackages };
