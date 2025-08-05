import { RCPublisher, EXIT_CODES } from "@nimbus-ds/scripts/src";

// Main execution
async function main() {
  const publisher = new RCPublisher();

  // Handle graceful shutdown
  process.on("SIGINT", async () => {
    console.log("\n\n⚠️  Publishing interrupted by user");
    await publisher.cleanup();
    process.exit(EXIT_CODES.SIGINT);
  });

  process.on("SIGTERM", async () => {
    console.log("\n\n⚠️  Publishing terminated");
    await publisher.cleanup();
    process.exit(EXIT_CODES.SIGTERM);
  });

  const { packageName, version, otp, skipBuild, showHelp } =
    publisher.validateArgs(process.argv);

  if (showHelp) {
    return publisher.showHelp();
  }

  await publisher.run(packageName, version, skipBuild, otp);
}

if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Unexpected error:", error);
    process.exit(1);
  });
}
