import { RCPublisher, EXIT_CODES } from "@nimbus-ds/scripts/src";

// Main execution
async function main() {
  const publisher = new RCPublisher();

  // Handle graceful shutdown
  // extract common shutdown logic for both SIGINT and SIGTERM
  const handleShutdown = async (signal: string) => {
    console.log(
      `\n\n⚠️  Publishing ${
        signal === "SIGINT" ? "interrupted by user" : "terminated"
      }`
    );
    await publisher.cleanup();
    process.exit(signal === "SIGINT" ? EXIT_CODES.SIGINT : EXIT_CODES.SIGTERM);
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));

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
