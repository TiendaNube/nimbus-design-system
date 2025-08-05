/**
 * Basic package descriptor used by the RC publisher.
 * `version` must be a valid semver string.
 */
interface PackageInfo {
  name: string;
  version: string;
}

export type { PackageInfo };
