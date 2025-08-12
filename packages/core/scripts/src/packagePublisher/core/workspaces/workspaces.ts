import { execSync } from "child_process";
import { YarnWorkspace } from "./workspaces.types";

function getYarnWorkspaces(): YarnWorkspace[] {
  const workspacesOutput = execSync("yarn workspaces list --json", {
    encoding: "utf8",
  });

  const workspaces = workspacesOutput
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));

  return workspaces;
}

function buildPackage(packageName: string): void {
  try {
    execSync(`yarn workspace ${packageName} build`, {
      stdio: "inherit",
    });
  } catch (error) {
    throw new Error(
      `Failed to build package ${packageName}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export { getYarnWorkspaces, buildPackage };
