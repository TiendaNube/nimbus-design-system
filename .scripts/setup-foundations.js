#!/usr/bin/env node

/**
 * Setup Foundations Script
 *
 * Builds only the foundational packages without starting the development server.
 * Useful for CI/CD or when you just want to ensure dependencies are built.
 */

const { checkAndBuildFoundationalPackages } = require("./dev-setup");

console.log("🏗️  Setting up Nimbus Design System foundational packages...\n");

checkAndBuildFoundationalPackages();

console.log("✨ Foundational packages setup complete!");
console.log('💡 Run "yarn start:dev" to start the development server.');
