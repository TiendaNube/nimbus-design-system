import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { PackageBuilder } from "@nimbus-ds/scripts/src/packageBuilder";

export interface Release {
  ident: string;
  cwd: string;
  oldVersion: string;
  newVersion: string;
}
export type Run = (command: string, args: string[], cwd?: string) => string;
export const runCommand: Run = (command, args, cwd = process.cwd()) =>
  execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024
  });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function readManifest(directory: string): Record<string, unknown> {
  const manifest: unknown = JSON.parse(
    fs.readFileSync(path.join(directory, "package.json"), "utf8")
  );
  if (!isRecord(manifest))
    throw new Error(`Invalid workspace manifest at ${directory}`);
  return manifest;
}

export function parsePlan(output: string): Release[] {
  const releases = new Map<string, Release>();
  output
    .split("\n")
    .filter((item) => item.trim())
    .forEach((line) => {
      const value: unknown = JSON.parse(line);
      if (
        !isRecord(value) ||
        !["ident", "cwd", "oldVersion", "newVersion"].every(
          (key) => typeof value[key] === "string" && value[key]
        )
      )
        throw new Error("Invalid Yarn release plan");
      const release = value as unknown as Release;
      const previous = releases.get(release.ident);
      if (previous && JSON.stringify(previous) !== JSON.stringify(release)) {
        throw new Error(`Conflicting release plan for ${release.ident}`);
      }
      releases.set(release.ident, release);
    });
  return [...releases.values()];
}

function orderReleases(releases: Release[]): Release[] {
  const planned = new Map(releases.map((release) => [release.ident, release]));
  const ordered: Release[] = [];
  const completed = new Set<string>();
  const visiting = new Set<string>();
  const visit = (release: Release, ancestors: string[]): void => {
    if (completed.has(release.ident)) return;
    if (visiting.has(release.ident)) {
      throw new Error(
        `Release dependency cycle: ${[...ancestors, release.ident].join(
          " -> "
        )}`
      );
    }
    visiting.add(release.ident);
    const manifest = readManifest(release.cwd);
    ["dependencies", "peerDependencies", "optionalDependencies"].forEach(
      (key) => {
        const dependencies = manifest[key];
        if (!isRecord(dependencies)) return;
        Object.keys(dependencies).forEach((name) => {
          const dependency = planned.get(name);
          if (dependency) visit(dependency, [...ancestors, release.ident]);
        });
      }
    );
    visiting.delete(release.ident);
    completed.add(release.ident);
    ordered.push(release);
  };
  releases.forEach((release) => visit(release, []));
  return ordered;
}

export function preflightRegistry(
  release: Release,
  run: Run,
  registry?: string
): void {
  const target = `${release.ident}@${release.newVersion}`;
  let output: string;
  try {
    output = run("npm", [
      "view",
      target,
      "version",
      "--json",
      ...(registry ? ["--registry", registry] : [])
    ]);
  } catch (error) {
    // Only npm's structured E404 means absence. Never infer it from prose,
    // exit status alone, authentication errors or a failed network request.
    const stdout = isRecord(error) ? error.stdout : null;
    let response: unknown = null;
    try {
      response = JSON.parse(String(stdout));
    } catch {
      throw new Error(
        `Registry lookup failed for ${target}; no valid npm JSON error`
      );
    }
    if (
      isRecord(response) &&
      isRecord(response.error) &&
      response.error.code === "E404"
    )
      return;
    throw new Error(
      `Registry lookup failed for ${target}; expected a structured E404`
    );
  }
  const version: unknown = JSON.parse(output);
  if (version !== release.newVersion)
    throw new Error(`Invalid registry response for ${target}`);
  throw new Error(
    `Release drift: ${target} already exists; reconcile deferred versions explicitly`
  );
}

function exportTargets(value: unknown): string[] {
  if (value === null) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(exportTargets);
  if (isRecord(value)) return Object.values(value).flatMap(exportTargets);
  throw new Error("Malformed package exports");
}

function targetPattern(target: string): RegExp {
  return new RegExp(
    `^${target
      .split("*")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join(".+")}$`
  );
}

function componentDeclarationTargets(
  exports: unknown,
  entries: string[]
): string[] {
  return exportTargets(exports)
    .filter((target) => /^\.\/dist\/[^/]+\/index\.js$/.test(target))
    .flatMap((target) => {
      const pattern = targetPattern(`package/${target.replace(/^\.\//, "")}`);
      return entries
        .filter((entry) => pattern.test(entry))
        .map((entry) =>
          entry.slice("package/".length).replace(/\.js$/, ".d.ts")
        );
    });
}

export function verifyArchive(
  manifest: unknown,
  entries: string[],
  expectedName: string,
  expectedVersion: string
): void {
  if (
    !isRecord(manifest) ||
    manifest.name !== expectedName ||
    manifest.version !== expectedVersion
  ) {
    throw new Error(
      `Packed manifest identity/version mismatch for ${expectedName}@${expectedVersion}`
    );
  }
  const targets = ["main", "module", "types", "typings"].flatMap((key) => {
    const value = manifest[key];
    if (value === undefined) return [];
    if (typeof value !== "string" || !value)
      throw new Error(`Malformed ${key} for ${expectedName}`);
    return [value];
  });
  if (!targets.length)
    throw new Error(`No package entrypoints for ${expectedName}`);
  if (manifest.exports !== undefined)
    targets.push(...exportTargets(manifest.exports));
  if (
    expectedName === "@nimbus-ds/components" &&
    manifest.exports !== undefined
  )
    targets.push(...componentDeclarationTargets(manifest.exports, entries));
  targets.forEach((target) => {
    const normalized = target.replace(/^\.\//, "");
    if (normalized.startsWith("/") || normalized.split("/").includes("..")) {
      throw new Error(`Invalid packed target ${target}`);
    }
    const pattern = targetPattern(`package/${normalized}`);
    if (!entries.some((entry) => pattern.test(entry))) {
      throw new Error(`Missing packed artifact ${target} in ${expectedName}`);
    }
  });
  // Nimbus packages use declaration inference alongside main, rather than a
  // types field. Check that consumer contract even when no field declares it.
  if (typeof manifest.main === "string" && /\.js$/.test(manifest.main)) {
    const declaration = `package/${manifest.main
      .replace(/^\.\//, "")
      .replace(/\.js$/, ".d.ts")}`;
    if (!entries.includes(declaration))
      throw new Error(`Missing packed declarations ${declaration}`);
  }
}

export function packAndVerify(
  releases: Release[],
  applied: boolean,
  run: Run
): void {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "nimbus-release-"));
  try {
    releases.forEach((release, index) => {
      const archive = path.join(temporary, `${index}.tgz`);
      run("yarn", ["pack", "--out", archive], release.cwd);
      const entries = run("tar", ["-tzf", archive]).trim().split("\n");
      const manifest: unknown = JSON.parse(
        run("tar", ["-xOzf", archive, "package/package.json"])
      );
      verifyArchive(
        manifest,
        entries,
        release.ident,
        applied ? release.newVersion : release.oldVersion
      );
    });
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

// The aggregate imports component workspaces through their dist entrypoints,
// but those dependencies are absent from its manifest. Build them first.
export function buildReleasePackages(names: string[]): void {
  const aggregate = "@nimbus-ds/components";
  const builder = new PackageBuilder();
  if (!names.includes(aggregate)) {
    builder.build(names, ["nimbus-helper"], true);
    return;
  }
  const components = ["atomic", "composite"].flatMap((kind) => {
    const directory = path.join("packages/react/src", kind);
    return fs.readdirSync(directory).map((component) => {
      const manifest = readManifest(path.join(directory, component));
      if (typeof manifest.name !== "string")
        throw new Error("Component workspace name is missing");
      return manifest.name;
    });
  });
  builder.build(
    [...names.filter((name) => name !== aggregate), ...components],
    ["nimbus-helper"],
    true
  );
  execFileSync("yarn", ["workspace", aggregate, "build"], { stdio: "inherit" });
}

interface StableOptions {
  check?: boolean;
  validateOnly?: boolean;
}
interface StableDependencies {
  run: Run;
  build: (names: string[]) => void;
  pack: typeof packAndVerify;
}

export function stableRelease(
  options: StableOptions,
  dependencies: StableDependencies = {
    run: runCommand,
    build: buildReleasePackages,
    pack: packAndVerify
  }
): boolean {
  const { run, build, pack } = dependencies;
  const plan = parsePlan(
    run("yarn", ["version", "apply", "--all", "--dry-run", "--json"])
  );
  const publicReleases = plan.filter((release) => {
    const manifest = readManifest(release.cwd);
    if (
      manifest.name !== release.ident ||
      manifest.version !== release.oldVersion
    ) {
      throw new Error(
        `Workspace does not match release plan: ${release.ident}`
      );
    }
    return manifest.private !== true && release.ident !== "nimbus-helper";
  });
  if (!publicReleases.length) return false;
  const releases = orderReleases(publicReleases);
  const registry: unknown = JSON.parse(
    run("yarn", ["config", "get", "npmRegistryServer", "--json"])
  );
  if (typeof registry !== "string" || !/^https?:\/\//.test(registry)) {
    throw new Error("Invalid Yarn npm registry configuration");
  }
  releases.forEach((release) => preflightRegistry(release, run, registry));
  if (!options.validateOnly) {
    build(releases.map((release) => release.ident));
    run("yarn", ["build:docs"]);
  }
  pack(releases, false, run);
  if (options.check || options.validateOnly) return true;
  run("yarn", ["version", "apply", "--all"]);
  run("yarn", ["build:docs"]);
  pack(releases, true, run);
  // Recheck the entire set after the potentially long build, before the first
  // registry write. npm publication is not atomic across multiple workspaces.
  releases.forEach((release) => preflightRegistry(release, run, registry));
  releases.forEach((release) => {
    run("yarn", [
      "workspace",
      release.ident,
      "npm",
      "publish",
      "--access",
      "public"
    ]);
  });
  return true;
}
